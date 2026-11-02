<?php
/**
 * Startinnehåll: skapar sidorna med texterna från den tidigare webbplatsen
 * med ett klick (Utseende → Wolf: skapa sidor). Befintliga sidor med samma
 * adress lämnas orörda, så det är ofarligt att köra igen.
 */

defined( 'ABSPATH' ) || exit;

function wolf_start_pages() {
	return array(
		'startsida'                 => array( 'Startsida', 'wolf/sida-startsida' ),
		'specialtillverkade-vaskor' => array( 'Specialtillverkade väskor', 'wolf/sida-specialtillverkade-vaskor' ),
		'sortiment'                 => array( 'Sortiment', 'wolf/sida-sortiment' ),
		'wolf'                      => array( 'WOLF', 'wolf/sida-wolf' ),
		'samsonite'                 => array( 'Samsonite', 'wolf/sida-samsonite' ),
		'om-oss'                    => array( 'Om oss', 'wolf/sida-om-oss' ),
		'kontakt'                   => array( 'Kontakt', 'wolf/sida-kontakt' ),
	);
}

function wolf_create_start_content() {
	$registry = WP_Block_Patterns_Registry::get_instance();
	$created  = 0;

	foreach ( wolf_start_pages() as $slug => list( $title, $pattern ) ) {
		if ( get_page_by_path( $slug ) ) {
			continue;
		}
		$p = $registry->get_registered( $pattern );
		if ( ! $p ) {
			continue;
		}
		$id = wp_insert_post( wp_slash( array(
			'post_type'    => 'page',
			'post_status'  => 'publish',
			'post_title'   => $title,
			'post_name'    => $slug,
			'post_content' => $p['content'],
		) ) );
		if ( $id && ! is_wp_error( $id ) ) {
			++$created;
		}
	}

	// Policyer skapas som utkast: de innehåller [hakparenteser] att fylla i.
	$dir   = get_template_directory() . '/inc/policyer/';
	$index = json_decode( (string) file_get_contents( $dir . 'index.json' ), true );
	foreach ( (array) $index as $policy ) {
		if ( get_page_by_path( $policy['slug'], OBJECT, 'page' ) ) {
			continue;
		}
		$id = wp_insert_post( wp_slash( array(
			'post_type'     => 'page',
			'post_status'   => 'draft',
			'post_title'    => $policy['title'],
			'post_name'     => $policy['slug'],
			'post_content'  => file_get_contents( $dir . $policy['slug'] . '.html' ),
			'page_template' => 'page-text',
		) ) );
		if ( $id && ! is_wp_error( $id ) ) {
			++$created;
			if ( 'integritetspolicy' === $policy['slug'] ) {
				update_option( 'wp_page_for_privacy_policy', $id );
			}
		}
	}

	$front = get_page_by_path( 'startsida' );
	if ( $front ) {
		update_option( 'show_on_front', 'page' );
		update_option( 'page_on_front', $front->ID );
	}
	if ( ! get_option( 'permalink_structure' ) ) {
		update_option( 'permalink_structure', '/%postname%/' );
	}
	$default_titles = array( 'Min WordPress-webbplats', 'My WordPress Website', 'Min blogg', '' );
	if ( in_array( get_option( 'blogname' ), $default_titles, true ) ) {
		update_option( 'blogname', 'Stockholms Etui- & Koffertfabrik Wolf AB' );
	}
	if ( in_array( get_option( 'blogdescription' ), array( 'Just another WordPress site', 'Ännu en WordPress-webbplats', '' ), true ) ) {
		update_option( 'blogdescription', 'Etuier, skrin och väskor sedan generationer' );
	}
	flush_rewrite_rules();
	update_option( 'wolf_setup_done', 1 );

	return $created;
}

add_action( 'admin_menu', function () {
	add_theme_page( 'Wolf: skapa sidor', 'Wolf: skapa sidor', 'manage_options', 'wolf-start', 'wolf_start_page' );
} );

function wolf_start_page() {
	$done = null;
	if ( isset( $_POST['wolf_start'] ) && check_admin_referer( 'wolf_start' ) ) {
		$done = wolf_create_start_content();
	}
	?>
	<div class="wrap">
		<h1>Wolf: skapa sidor</h1>
		<?php if ( null !== $done ) : ?>
			<div class="notice notice-success"><p>
				<?php echo esc_html( sprintf( 'Klart! %d sidor skapades.', $done ) ); ?>
				<a href="<?php echo esc_url( home_url( '/' ) ); ?>">Visa webbplatsen</a> ·
				<a href="<?php echo esc_url( admin_url( 'edit.php?post_type=page' ) ); ?>">Gå till Sidor</a>
			</p></div>
		<?php endif; ?>
		<p>Skapar Startsida, Specialtillverkade väskor, Sortiment, WOLF, Samsonite, Om oss och Kontakt med samma texter som på den tidigare webbplatsen, och gör Startsida till förstasida.</p>
		<p>Policysidorna (integritetspolicy, köpvillkor m.fl.) skapas som <strong>utkast</strong>. Fyll i det som står inom [hakparenteser] och publicera dem sedan.</p>
		<p>Sidor som redan finns med samma adress ändras inte.</p>
		<form method="post">
			<?php wp_nonce_field( 'wolf_start' ); ?>
			<?php submit_button( 'Skapa sidorna', 'primary', 'wolf_start' ); ?>
		</form>
	</div>
	<?php
}

add_action( 'admin_notices', function () {
	if ( get_option( 'wolf_setup_done' ) || ! current_user_can( 'manage_options' ) ) {
		return;
	}
	$screen = get_current_screen();
	if ( $screen && 'appearance_page_wolf-start' === $screen->id ) {
		return;
	}
	printf(
		'<div class="notice notice-info"><p><strong>Wolf-temat är aktiverat.</strong> <a href="%s">Skapa webbplatsens sidor med ett klick</a>.</p></div>',
		esc_url( admin_url( 'themes.php?page=wolf-start' ) )
	);
} );
