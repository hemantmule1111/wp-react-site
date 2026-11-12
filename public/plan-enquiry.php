<?php
/**
 * WorkPilot plan enquiry endpoint (lives next to index.html in /en/).
 * Emails the plan request from the popup form to $TO. Same spam protection as contact.php:
 * honeypot, minimum fill time, per-IP rate limit, validation and header-injection checks.
 */
@ini_set( 'display_errors', '0' );
ob_start();

$TO   = 'contact@wpart.co.in';
$FROM = 'noreply@wpart.co.in'; // must be an address on your own domain so mail isn't rejected

function reply( $ok, $message = '', $status = 200 ) {
	while ( ob_get_level() ) { ob_end_clean(); }
	header( 'Content-Type: application/json; charset=utf-8' );
	header( 'Cache-Control: no-store' );
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

if ( ! empty( $p['website'] ) ) {
	reply( true ); // honeypot
}
if ( (int) ( $p['elapsed'] ?? 0 ) < 3000 ) {
	reply( false, 'Please take a moment to complete the form and try again.', 400 );
}

$ip   = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$file = sys_get_temp_dir() . '/wpart_plan_' . md5( $ip );
$now  = time();
$hits = array();
if ( is_readable( $file ) ) {
	$hits = array_filter( array_map( 'intval', explode( ',', (string) file_get_contents( $file ) ) ), function ( $t ) use ( $now ) {
		return $t > $now - 3600;
	} );
}
if ( count( $hits ) >= 5 ) {
	reply( false, 'Too many requests from your connection. Please try again later.', 429 );
}

$clean   = function ( $v ) { return trim( strip_tags( (string) $v ) ); };
$name    = substr( $clean( $p['name'] ?? '' ), 0, 100 );
$email   = trim( (string) ( $p['email'] ?? '' ) );
$phone   = substr( $clean( $p['phone'] ?? '' ), 0, 30 );
$company = substr( $clean( $p['company'] ?? '' ), 0, 120 );
$plan    = substr( $clean( $p['plan'] ?? '' ), 0, 40 );
$billing = substr( $clean( $p['billing'] ?? '' ), 0, 20 );
$price   = substr( $clean( $p['price'] ?? '' ), 0, 40 );
$message = substr( $clean( $p['message'] ?? '' ), 0, 2000 );

if ( '' === $name || ! filter_var( $email, FILTER_VALIDATE_EMAIL ) ) {
	reply( false, 'Please enter your name and a valid email address.', 400 );
}
if ( preg_match( '~[\r\n]~', $name . $email . $phone . $company . $plan . $billing . $price ) ) {
	reply( false, 'Invalid details.', 400 );
}
if ( preg_match_all( '~https?://|www\.~i', $message ) > 2 ) {
	reply( false, 'Your message looks like spam. Please remove extra links.', 400 );
}

date_default_timezone_set( 'Asia/Kolkata' );
$h    = function ( $v ) { return htmlspecialchars( (string) $v, ENT_QUOTES, 'UTF-8' ); };
$when = date( 'd M Y, h:i A' ) . ' IST';

$text = "WorkPilot plan request\n\nPlan: $plan" . ( $price ? " ($price, $billing)" : '' )
	. "\nName: $name\nEmail: $email\n" . ( $phone ? "Phone: $phone\n" : '' ) . ( $company ? "Company: $company\n" : '' )
	. ( $message ? "\nMessage:\n$message\n" : '' ) . "\nTime: $when\nIP: $ip";

$rows = '';
foreach ( array( 'Plan' => $plan . ( $price ? " ($price, $billing)" : '' ), 'Name' => $name, 'Email' => $email, 'Phone' => $phone, 'Company' => $company ) as $label => $val ) {
	if ( '' !== trim( $val ) ) {
		$rows .= '<tr><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#64748b;font-size:13px;width:90px;">' . $label . '</td>'
			. '<td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#0f172a;font-size:14px;font-weight:600;">' . $h( $val ) . '</td></tr>';
	}
}
$msgHtml = '' === $message ? '' : '<p style="margin:18px 0 0;padding:14px;background:#f8fafc;border-radius:10px;color:#334155;font-size:14px;line-height:1.6;white-space:pre-wrap;">' . $h( $message ) . '</p>';
$html = '<!doctype html><html><body style="margin:0;padding:24px;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;">'
	. '<div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;">'
	. '<div style="padding:22px 28px;background:linear-gradient(90deg,#7c3aed,#d946ef,#fb9133);color:#fff;"><div style="font-size:12px;opacity:.9;">WorkPilot HR</div>'
	. '<div style="font-size:20px;font-weight:700;margin-top:2px;">New plan request: ' . $h( $plan ) . '</div></div>'
	. '<div style="padding:22px 28px;"><table style="width:100%;border-collapse:collapse;">' . $rows . '</table>' . $msgHtml
	. '<p style="margin:20px 0 0;"><a href="mailto:' . $h( $email ) . '?subject=' . rawurlencode( 'Your WorkPilot ' . $plan . ' plan' ) . '" style="display:inline-block;padding:12px 22px;background:#fb9133;color:#fff;border-radius:10px;font-size:14px;font-weight:700;text-decoration:none;">Reply to ' . $h( $name ) . '</a></p>'
	. '<p style="margin:18px 0 0;color:#94a3b8;font-size:12px;">' . $h( $when ) . '</p></div></div></body></html>';

$boundary = 'wp' . md5( uniqid( '', true ) );
$headers  = "From: WPArt Website <$FROM>\r\nReply-To: $name <$email>\r\nMIME-Version: 1.0\r\n"
	. "Content-Type: multipart/alternative; boundary=\"$boundary\"\r\n";
$body     = "--$boundary\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n" . chunk_split( base64_encode( $text ) )
	. "--$boundary\r\nContent-Type: text/html; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n" . chunk_split( base64_encode( $html ) )
	. "--$boundary--";
$subject  = '=?UTF-8?B?' . base64_encode( 'WorkPilot ' . $plan . ' plan request from ' . $name ) . '?=';

if ( ! @mail( $TO, $subject, $body, $headers, '-f' . $FROM ) && ! @mail( $TO, $subject, $body, $headers ) ) {
	error_log( 'WPArt plan form: mail() failed for ' . $email );
	reply( false, 'Sorry, your request could not be sent.', 500 );
}

$hits[] = $now;
@file_put_contents( $file, implode( ',', $hits ) );
reply( true );
