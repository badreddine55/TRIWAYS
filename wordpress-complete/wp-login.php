<?php
/**
 * TRIWAYS WordPress Login
 * Loads the WordPress login page
 */

// Setup WordPress path
define('ABSPATH', dirname(__FILE__) . '/');

// Load WordPress Core
require_once(ABSPATH . 'wp-load.php');

// Redirect to login if accessed directly
if (!is_user_logged_in()) {
    wp_redirect(wp_login_url());
    exit;
}

// If user is logged in, redirect to dashboard
wp_safe_remote_get(admin_url());
exit;
?>
