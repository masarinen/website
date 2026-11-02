<?php
/**
 * Wolf – temafunktioner.
 *
 * Utseendet styrs av theme.json och assets/css/wolf.css. Sidornas innehåll är
 * vanliga block som redigeras i WordPress. Här finns bara det som block inte
 * klarar själva: blockstilar, kontaktformulär, startinnehåll och WooCommerce.
 */

defined( 'ABSPATH' ) || exit;

define( 'WOLF_VERSION', wp_get_theme( get_template() )->get( 'Version' ) );

require get_template_directory() . '/inc/installningar.php';
require get_template_directory() . '/inc/kontaktformular.php';
require get_template_directory() . '/inc/startinnehall.php';
require get_template_directory() . '/inc/woocommerce.php';

add_action( 'after_setup_theme', function () {
	add_theme_support( 'wp-block-styles' );
	add_theme_support( 'editor-styles' );
	add_editor_style( 'assets/css/wolf.css' );
	add_theme_support( 'woocommerce' );
	add_theme_support( 'wc-product-gallery-zoom' );
	add_theme_support( 'wc-product-gallery-lightbox' );
	add_theme_support( 'wc-product-gallery-slider' );
} );

add_action( 'wp_enqueue_scripts', function () {
	wp_enqueue_style( 'wolf', get_theme_file_uri( 'assets/css/wolf.css' ), array(), WOLF_VERSION );
	wp_enqueue_script( 'wolf', get_theme_file_uri( 'assets/js/wolf.js' ), array(), WOLF_VERSION, array( 'strategy' => 'defer' ) );
} );

/* Typsnitten laddas tidigt så att rubrikerna inte hoppar. */
add_action( 'wp_head', function () {
	foreach ( array( 'cormorant-500.woff2', 'hanken-grotesk.woff2' ) as $font ) {
		printf( '<link rel="preload" href="%s" as="font" type="font/woff2" crossorigin>' . "\n", esc_url( get_theme_file_uri( 'assets/fonts/' . $font ) ) );
	}
}, 1 );

add_action( 'init', function () {
	register_block_style( 'core/paragraph', array( 'name' => 'overrubrik', 'label' => 'Överrubrik' ) );
	register_block_style( 'core/paragraph', array( 'name' => 'pil', 'label' => 'Länk med pil' ) );
	register_block_style( 'core/button', array( 'name' => 'ljus', 'label' => 'Ljus (på mörk bakgrund)' ) );
	register_block_style( 'core/list', array( 'name' => 'bockar', 'label' => 'Bockar' ) );

	register_block_pattern_category( 'wolf-sektioner', array( 'label' => 'Wolf – sektioner' ) );
	register_block_pattern_category( 'wolf-sidor', array( 'label' => 'Wolf – hela sidor' ) );
} );

/* Aktuellt år, används i sidfoten: [wolf_ar] */
add_shortcode( 'wolf_ar', function () {
	return esc_html( wp_date( 'Y' ) );
} );

/* Shortkoder körs inte i mallarnas delar, så [wolf_ar] byts ut här. */
add_filter( 'render_block_core/paragraph', function ( $html ) {
	return false === strpos( $html, '[wolf_ar]' ) ? $html : str_replace( '[wolf_ar]', esc_html( wp_date( 'Y' ) ), $html );
} );
