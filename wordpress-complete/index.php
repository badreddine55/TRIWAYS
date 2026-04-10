<?php
/**
 * TRIWAYS Main Entry Point
 * Serves the React application
 */

// Get the current file's directory
$root_dir = dirname(__FILE__);

// Check if this is a request for a real file or directory
$requested = $_SERVER['REQUEST_URI'];
$requested_path = $root_dir . $requested;

// If requesting a file that exists (css, js, images, etc.), serve it
if (file_exists($requested_path) && !is_dir($requested_path)) {
    // Let the server handle static files
    return false;
}

// If requesting a directory that exists, try index.html in that directory
if (is_dir($requested_path) && file_exists($requested_path . '/index.html')) {
    include($requested_path . '/index.html');
    exit;
}

// For all other requests, serve the main React application
$index_file = $root_dir . '/index.html';
if (file_exists($index_file)) {
    include($index_file);
} else {
    // Fallback if index.html doesn't exist
    echo '<!DOCTYPE html>
<html>
<head>
    <title>TRIWAYS - Logistics Solutions</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <div id="root"></div>
    <p>Welcome to TRIWAYS. Application files are being loaded...</p>
</body>
</html>';
}
?>
