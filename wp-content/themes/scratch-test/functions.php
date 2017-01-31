<?php

add_action( 'wp_enqueue_scripts', 'theme_enqueue' );
function theme_enqueue() {
  wp_enqueue_style( 'styles', get_stylesheet_directory_uri() . '/public/css/main.css', null, null );
	wp_enqueue_script( 'main-js', get_stylesheet_directory_uri() . '/public/js/main.min.js', false, false, false );
}


?>
