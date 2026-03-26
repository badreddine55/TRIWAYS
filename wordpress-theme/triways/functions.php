<?php
function triways_enqueue_assets() {
    wp_enqueue_style('triways-style', get_template_directory_uri() . '/assets/index-DyZnqc0c.css');
    wp_enqueue_script('triways-script', get_template_directory_uri() . '/assets/index-DJqS_kFZ.js', array(), false, true);
}
add_action('wp_enqueue_scripts', 'triways_enqueue_assets');