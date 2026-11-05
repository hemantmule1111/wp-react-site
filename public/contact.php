<?php
/**
 * Contact form endpoint for the React site (lives next to index.html in /en/).
 * Emails the enquiry to $TO. Spam protection: honeypot field, minimum fill time,
 * per-IP rate limit, validation and length caps, link/keyword filtering.
 */
$TO   = 'mule.hemant@gmail.com';
$FROM = 'noreply@wpart.co.in'; // must be an address on your own domain so mail isn't rejected

header( 'Content-Type: application/json; charset=utf-8' );
header( 'Cache-Control: no-store' );

function reply( $ok, $message = '', $status = 200 ) {
	http_response_code( $status );
	echo json_encode( array( 'ok' => $ok, 'message' => $message ) );
	exit;
}

if ( 'POST' !== ( $_SERVER['REQUEST_METHOD'] ?? '' ) ) {
	reply( false, 'Method not allowed.', 405 );
}

$p = json_decode( file_get_contents( 'php://input' ), true );
if ( ! is_array( $p ) ) {
	$p = $_POST;
}

// 1. Honeypot: people never see this field. Pretend success so bots learn nothing.
if ( ! empty( $p['website'] ) ) {
	reply( true );
}

// 2. Time trap: humans need more than a few seconds to fill the form.
if ( (int) ( $p['elapsed'] ?? 0 ) < 4000 ) {
	reply( false, 'Please take a moment to complete the form and try again.', 400 );
}

// 3. Rate limit: 3 messages per hour per IP.
$ip   = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$file = sys_get_temp_dir() . '/wpart_contact_' . md5( $ip );
$now  = time();
$hits = array();
if ( is_readable( $file ) ) {
	$hits = array_filter( array_map( 'intval', explode( ',', (string) file_get_contents( $file ) ) ), function ( $t ) use ( $now ) {
		return $t > $now - 3600;
	} );
}
if ( count( $hits ) >= 3 ) {
	reply( false, 'Too many messages from your connection. Please try again later.', 429 );
}

// 4. Validate.
$clean   = function ( $v ) { return trim( strip_tags( (string) $v ) ); };
$name    = $clean( $p['name'] ?? '' );
$email   = trim( (string) ( $p['email'] ?? '' ) );
$message = $clean( $p['message'] ?? '' );
if ( '' === $name || ! filter_var( $email, FILTER_VALIDATE_EMAIL ) || '' === $message ) {
	reply( false, 'Please fill in your name, a valid email and a message.', 400 );
}
if ( strlen( $name ) > 100 || strlen( $message ) < 10 || strlen( $message ) > 5000 ) {
	reply( false, 'Your message is too short or too long.', 400 );
}

// 5. Content filter: max 2 links, no spam phrases, no header injection.
if ( preg_match( '~[\r\n]~', $name . $email ) || preg_match_all( '~https?://|www\.~i', $message ) > 2 ) {
	reply( false, 'Your message looks like spam. Please remove extra links and try again.', 400 );
}
if ( preg_match( '~\b(viagra|cialis|casino|crypto\s*invest|loan\s*offer|seo\s*services|backlinks?)\b~i', $name . ' ' . $message ) ) {
	reply( false, 'Your message looks like spam.', 400 );
}

$headers = "From: WPArt Website <$FROM>\r\nReply-To: $name <$email>\r\nContent-Type: text/plain; charset=UTF-8";
$body    = $message . "\n\nFrom: $name <$email>\nIP: $ip";
$subject = '=?UTF-8?B?' . base64_encode( 'Project enquiry from ' . $name ) . '?=';

if ( ! mail( $TO, $subject, $body, $headers ) ) {
	reply( false, 'Sorry, your message could not be sent.', 500 );
}

$hits[] = $now;
@file_put_contents( $file, implode( ',', $hits ) );
reply( true );
