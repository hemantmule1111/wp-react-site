<?php
/**
 * Visitor counter for the React site (lives next to index.html in /en/).
 * GET  -> { count }          POST -> adds one visit, returns { count }
 * The count starts at 22102 ($START) until visitors-count.txt exists. That file, created on the server, holds the
 * running total; the site zip never contains it, so re-uploading the site does not reset the count.
 */
header( 'Content-Type: application/json; charset=utf-8' );
header( 'Cache-Control: no-store' );

$START = 22102;
$file  = __DIR__ . '/visitors-count.txt';
$fp   = @fopen( $file, 'c+' );
if ( ! $fp || ! flock( $fp, LOCK_EX ) ) {
	http_response_code( 500 );
	echo json_encode( array( 'error' => 'Counter file is not writable.' ) );
	exit;
}
$stored = trim( (string) stream_get_contents( $fp ) );
$count  = '' === $stored ? $START : (int) $stored;
if ( 'POST' === ( $_SERVER['REQUEST_METHOD'] ?? '' ) ) {
	$count++;
	ftruncate( $fp, 0 );
	rewind( $fp );
	fwrite( $fp, (string) $count );
}
flock( $fp, LOCK_UN );
fclose( $fp );
echo json_encode( array( 'count' => $count ) );
