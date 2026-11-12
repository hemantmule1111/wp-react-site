<?php
/**
 * Contact form endpoint for the React site (lives next to index.html in /en/).
 * Emails the enquiry to $TO. Spam protection: honeypot field, minimum fill time,
 * per-IP rate limit, validation and length caps, link/keyword filtering.
 */
// Never let PHP warnings leak into the JSON reply (a stray warning breaks the form).
@ini_set( 'display_errors', '0' );
ob_start();

$TO   = 'contact@wpart.co.in';
$FROM = 'noreply@wpart.co.in'; // must be an address on your own domain so mail isn't rejected

header( 'Content-Type: application/json; charset=utf-8' );
header( 'Cache-Control: no-store' );

function reply( $ok, $message = '', $status = 200 ) {
	while ( ob_get_level() ) { ob_end_clean(); }
	header( 'Content-Type: application/json; charset=utf-8' );
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
$phone    = substr( $clean( $p['phone'] ?? '' ), 0, 30 );
$budget   = substr( $clean( $p['budget'] ?? '' ), 0, 60 );
$timeline = substr( $clean( $p['timeline'] ?? '' ), 0, 60 );
$services = array();
if ( ! empty( $p['services'] ) && is_array( $p['services'] ) ) {
	foreach ( array_slice( $p['services'], 0, 20 ) as $svc ) {
		$services[] = substr( $clean( $svc ), 0, 80 );
	}
}
if ( preg_match( '~[\r\n]~', $phone . $budget . $timeline ) ) {
	reply( false, 'Invalid details.', 400 );
}
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

// ---- Email: plain-text version (fallback) + designed HTML version ----
$text = 'Services: ' . ( $services ? implode( ', ', $services ) : '(none selected)' ) . "\n"
	. ( $budget ? "Budget: $budget\n" : '' )
	. ( $timeline ? "Timeline: $timeline\n" : '' )
	. ( $phone ? "Phone: $phone\n" : '' )
	. "\n" . $message . "\n\nFrom: $name <$email>\nIP: $ip";

date_default_timezone_set( 'Asia/Kolkata' );
$h        = function ( $v ) { return htmlspecialchars( (string) $v, ENT_QUOTES, 'UTF-8' ); };
$initial  = strtoupper( function_exists( 'mb_substr' ) ? mb_substr( $name, 0, 1, 'UTF-8' ) : substr( $name, 0, 1 ) );
$telHref  = preg_replace( '~[^0-9+]~', '', $phone );
$mailHref = 'mailto:' . $email . '?subject=' . rawurlencode( 'Re: Your enquiry to WPArt' );
$when     = date( 'd M Y, h:i A' ) . ' IST';

$chips = '';
foreach ( $services as $svc ) {
	$chips .= '<span style="display:inline-block;margin:0 6px 8px 0;padding:7px 14px;background:#f3e8ff;color:#6d28d9;border-radius:999px;font-size:13px;font-weight:600;">' . $h( $svc ) . '</span>';
}
if ( '' === $chips ) {
	$chips = '<span style="color:#64748b;font-size:14px;">No service selected</span>';
}

$rows = '';
foreach ( array( 'Budget' => $budget, 'Timeline' => $timeline, 'Phone' => $phone ) as $label => $val ) {
	if ( '' !== $val ) {
		$rows .= '<tr><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#64748b;font-size:13px;width:110px;">' . $label . '</td>'
			. '<td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#0f172a;font-size:14px;font-weight:600;">' . $h( $val ) . '</td></tr>';
	}
}

$callBtn = '' === $telHref ? '' : '<a href="tel:' . $h( $telHref ) . '" style="display:inline-block;margin-left:8px;padding:13px 24px;border:2px solid #fb9133;color:#e67e00;border-radius:10px;font-size:15px;font-weight:700;text-decoration:none;">Call now</a>';

$html = '<!doctype html><html><body style="margin:0;padding:0;background:#f4f1fb;">'
	. '<div style="display:none;max-height:0;overflow:hidden;opacity:0;">New enquiry from ' . $h( $name ) . '</div>'
	. '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1fb;padding:24px 12px;"><tr><td align="center">'
	. '<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;font-family:Segoe UI,Helvetica,Arial,sans-serif;">'
	// header
	. '<tr><td style="background:#7c3aed;background-image:linear-gradient(135deg,#7c3aed 0%,#d946ef 55%,#fb9133 100%);border-radius:18px 18px 0 0;padding:34px 32px;">'
	. '<div style="font-size:26px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">WPArt</div>'
	. '<div style="margin-top:14px;font-size:13px;color:#ffffff;opacity:0.9;text-transform:uppercase;letter-spacing:2px;">New project enquiry</div>'
	. '<div style="margin-top:4px;font-size:22px;font-weight:700;color:#ffffff;">You have a new lead &#127881;</div>'
	. '</td></tr>'
	// body
	. '<tr><td style="background:#ffffff;padding:30px 32px;">'
	// contact
	. '<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>'
	. '<td width="60" valign="top"><div style="width:52px;height:52px;line-height:52px;border-radius:50%;background:#fb9133;color:#ffffff;text-align:center;font-size:22px;font-weight:700;">' . $h( $initial ) . '</div></td>'
	. '<td valign="middle"><div style="font-size:19px;font-weight:700;color:#0f172a;">' . $h( $name ) . '</div>'
	. '<div style="margin-top:2px;font-size:14px;"><a href="mailto:' . $h( $email ) . '" style="color:#7c3aed;text-decoration:none;">' . $h( $email ) . '</a></div></td>'
	. '</tr></table>'
	// services
	. '<div style="margin-top:28px;font-size:12px;font-weight:700;color:#e67e00;text-transform:uppercase;letter-spacing:1.5px;">Services needed</div>'
	. '<div style="margin-top:10px;">' . $chips . '</div>'
	// details
	. ( '' !== $rows ? '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:14px;">' . $rows . '</table>' : '' )
	// message
	. '<div style="margin-top:28px;font-size:12px;font-weight:700;color:#e67e00;text-transform:uppercase;letter-spacing:1.5px;">Message</div>'
	. '<div style="margin-top:10px;padding:18px 20px;background:#fff7ed;border-left:4px solid #fb9133;border-radius:8px;color:#1e293b;font-size:15px;line-height:1.65;">' . nl2br( $h( $message ) ) . '</div>'
	// buttons
	. '<div style="margin-top:30px;"><a href="' . $h( $mailHref ) . '" style="display:inline-block;padding:15px 28px;background:#fb9133;color:#ffffff;border-radius:10px;font-size:15px;font-weight:700;text-decoration:none;">Reply to ' . $h( strtok( $name, ' ' ) ) . ' &rarr;</a>' . $callBtn . '</div>'
	. '</td></tr>'
	// footer
	. '<tr><td style="background:#faf7ff;border-radius:0 0 18px 18px;padding:18px 32px;border-top:1px solid #ede9fe;color:#64748b;font-size:12px;line-height:1.7;">'
	. 'Received ' . $h( $when ) . ' &middot; IP ' . $h( $ip ) . '<br>Sent from the contact form at <a href="https://wpart.co.in/en/contact" style="color:#7c3aed;text-decoration:none;">wpart.co.in/en/contact</a>'
	. '</td></tr>'
	. '</table></td></tr></table></body></html>';

$boundary = 'wpart_' . md5( uniqid( '', true ) );
$headers  = "From: WPArt Website <$FROM>\r\nReply-To: $name <$email>\r\nMIME-Version: 1.0\r\n"
	. "Content-Type: multipart/alternative; boundary=\"$boundary\"";
$body     = "--$boundary\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n" . chunk_split( base64_encode( $text ) )
	. "--$boundary\r\nContent-Type: text/html; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n" . chunk_split( base64_encode( $html ) )
	. "--$boundary--";
$subject  = '=?UTF-8?B?' . base64_encode( 'New enquiry from ' . $name . ( $services ? ' - ' . $services[0] . ( count( $services ) > 1 ? ' +' . ( count( $services ) - 1 ) : '' ) : '' ) ) . '?=';

// -f sets the envelope sender; many hosts silently drop mail without it.
if ( ! @mail( $TO, $subject, $body, $headers, '-f' . $FROM ) && ! @mail( $TO, $subject, $body, $headers ) ) {
	error_log( 'WPArt contact form: mail() failed for ' . $email );
	reply( false, 'Sorry, your message could not be sent.', 500 );
}

$hits[] = $now;
@file_put_contents( $file, implode( ',', $hits ) );
reply( true );
