<?php

/* Do not remove this line. */
require_once('includes/scratch.php');









/*
 * scratch_meta() adds all meta information to the <head> element for us.
 */

function scratch_meta() { ?>

  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="description" content="<?php bloginfo('description'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <!-- Place favicon.ico in the root directory -->

<?php }

add_action('wp_head', 'scratch_meta');

/* Enable ACF Options Pages */

if(function_exists('acf_add_options_page')) {

  acf_add_options_page();
  acf_add_options_sub_page('Header');
  acf_add_options_sub_page('Sidebar');
  acf_add_options_sub_page('Footer');

}

/* Enable Featured Image */

add_theme_support( 'post-thumbnails' );

/* Enable Custom Menus */

add_theme_support( 'menus' );

register_nav_menus(
  array(
    'scratch-main-nav' => __( 'Main Nav', 'scratch' )   // main nav in header
  )
);

function scratch_main_nav() {
  // display the wp3 menu if available
  wp_nav_menu(array(
    'container' => false, // remove nav container
    'container_class' => '', // class of container (should you choose to use it)
    'menu' => __( 'Main Nav', 'scratch' ), // nav name
    'menu_class' => 'main-nav', // adding custom nav class
    'theme_location' => 'scratch-main-nav', // where it's located in the theme
    'before' => '', // before the menu
    'after' => '', // after the menu
    'link_before' => '', // before each link
    'link_after' => '', // after each link
    'depth' => 0    // fallback function
  ));
} /* end scratch main nav */

function scratch_login_stylesheet() { ?>
  <link rel="stylesheet"
        id="custom_wp_admin_css"
        href="<?php echo get_template_directory_uri() . '/assets/css/login.css?ver=' . filemtime(dirname(__FILE__) . '/assets/css/login.css'); ?>"
        type="text/css"
        media="all" />
<?php }
add_action( 'login_enqueue_scripts', 'scratch_login_stylesheet' );

function scratch_login_logo_url() {
  return home_url();
}
add_filter( 'login_headerurl', 'scratch_login_logo_url' );

function scratch_login_logo_url_title() {
  return get_bloginfo('name');
}
add_filter( 'login_headertitle', 'scratch_login_logo_url_title' );









/* Place custom functions below here. */

/* Don't delete this closing tag. */
?>
