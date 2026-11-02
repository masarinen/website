<?php
/**
 * Inställningar → Wolf. Det som inte hör till ett enskilt block:
 * mottagare för kontaktformuläret och hur priser visas i WooCommerce.
 */

defined( 'ABSPATH' ) || exit;

function wolf_defaults() {
	return array(
		'epost'       => 'robert@wolf.se',
		'amnen'       => "Specialbeställning\nFråga om sortimentet\nReparation\nÖvrigt",
		'rrp_marken'  => 'Samsonite',
		'rrp_etikett' => 'Rek. utpris',
		'rrp_text'    => 'Kontakta oss för uppdaterade priser.',
		'b2b_text'    => 'Du är inloggad som företagskund – priserna som visas är dina avtalspriser.',
		'kopknapp'    => 0,
	);
}

function wolf_opt( $key ) {
	$opts = wp_parse_args( (array) get_option( 'wolf', array() ), wolf_defaults() );
	return $opts[ $key ] ?? '';
}

add_action( 'admin_init', function () {
	register_setting( 'wolf', 'wolf', array(
		'type'              => 'array',
		'sanitize_callback' => function ( $in ) {
			$in = (array) $in;
			return array(
				'epost'       => sanitize_email( $in['epost'] ?? '' ),
				'amnen'       => sanitize_textarea_field( $in['amnen'] ?? '' ),
				'rrp_marken'  => sanitize_text_field( $in['rrp_marken'] ?? '' ),
				'rrp_etikett' => sanitize_text_field( $in['rrp_etikett'] ?? '' ),
				'rrp_text'    => sanitize_text_field( $in['rrp_text'] ?? '' ),
				'b2b_text'    => sanitize_text_field( $in['b2b_text'] ?? '' ),
				'kopknapp'    => empty( $in['kopknapp'] ) ? 0 : 1,
			);
		},
	) );
} );

add_action( 'admin_menu', function () {
	add_options_page( 'Wolf', 'Wolf', 'manage_options', 'wolf', 'wolf_settings_page' );
} );

function wolf_settings_page() {
	$o     = wp_parse_args( (array) get_option( 'wolf', array() ), wolf_defaults() );
	$field = function ( $key, $label, $help = '', $type = 'text' ) use ( $o ) {
		printf( '<tr><th scope="row"><label for="wolf-%1$s">%2$s</label></th><td>', esc_attr( $key ), esc_html( $label ) );
		if ( 'textarea' === $type ) {
			printf( '<textarea id="wolf-%1$s" name="wolf[%1$s]" rows="5" class="large-text">%2$s</textarea>', esc_attr( $key ), esc_textarea( $o[ $key ] ) );
		} elseif ( 'checkbox' === $type ) {
			printf( '<label><input type="checkbox" id="wolf-%1$s" name="wolf[%1$s]" value="1" %2$s> %3$s</label>', esc_attr( $key ), checked( $o[ $key ], 1, false ), esc_html( $help ) );
			$help = '';
		} else {
			printf( '<input type="%3$s" id="wolf-%1$s" name="wolf[%1$s]" value="%2$s" class="regular-text">', esc_attr( $key ), esc_attr( $o[ $key ] ), esc_attr( $type ) );
		}
		if ( $help ) {
			printf( '<p class="description">%s</p>', esc_html( $help ) );
		}
		echo '</td></tr>';
	};
	?>
	<div class="wrap">
		<h1>Wolf – inställningar</h1>
		<form method="post" action="options.php">
			<?php settings_fields( 'wolf' ); ?>
			<h2>Kontaktformulär</h2>
			<table class="form-table" role="presentation">
				<?php
				$field( 'epost', 'Skicka meddelanden till', 'Meddelanden sparas också under Meddelanden i menyn till vänster, ifall e-posten inte kommer fram.', 'email' );
				$field( 'amnen', 'Ämnen att välja bland', 'Ett ämne per rad.', 'textarea' );
				?>
			</table>
			<h2>Priser i WooCommerce</h2>
			<table class="form-table" role="presentation">
				<?php
				$field( 'rrp_marken', 'Märken med rekommenderat utpris', 'Namnet på produktkategorin eller varumärket, t.ex. Samsonite. Flera skiljs med komma.' );
				$field( 'rrp_etikett', 'Text före priset' );
				$field( 'rrp_text', 'Text under priset på produktsidan' );
				$field( 'b2b_text', 'Text till inloggade företagskunder', 'Visas för användare med rollen Företagskund.' );
				$field( 'kopknapp', 'Webbutik', 'Visa ”Lägg i varukorgen” så att kunder kan beställa direkt. Lämna avmarkerat för att bara visa produkter och priser med en kontaktknapp.', 'checkbox' );
				?>
			</table>
			<?php submit_button( 'Spara' ); ?>
		</form>
	</div>
	<?php
}
