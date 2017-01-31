<?php

$table_prefix  = 'wp_';

if ( !defined('ABSPATH') ) define('ABSPATH', dirname(__FILE__) . '/');
error_log("????????" . getenv('WP_ENV'));
// Try environment variable 'WP_ENV'
if (getenv('WP_ENV') !== false) {
  // Filter non-alphabetical characters for security
  define('WP_ENV', preg_replace('/[^a-z]/', '', getenv('WP_ENV')));
}

// Load config file for current environment
include ABSPATH . 'env/' . WP_ENV . '.php';

require_once(ABSPATH . 'wp-settings.php');
