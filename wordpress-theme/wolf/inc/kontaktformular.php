<?php
/**
 * Kontaktformulär: [wolf_kontaktformular]
 *
 * Skickar meddelandet med wp_mail till adressen under Inställningar → Wolf och
 * sparar en kopia under Meddelanden, så att inget försvinner om e-posten
 * stoppas. Skydd mot skräppost: dolt fält och minsta tid för att fylla i.
 */

defined( 'ABSPATH' ) || exit;

add_action( 'init', function () {
	register_post_type( 'wolf_meddelande', array(
		'labels'          => array(
			'name'          => 'Meddelanden',
			'singular_name' => 'Meddelande',
			'menu_name'     => 'Meddelanden',
			'all_items'     => 'Alla meddelanden',
			'edit_item'     => 'Meddelande',
			'not_found'     => 'Inga meddelanden ännu.',
		),
		'public'          => false,
		'show_ui'         => true,
		'show_in_menu'    => true,
		'menu_icon'       => 'dashicons-email-alt',
		'menu_position'   => 26,
		'supports'        => array( 'title', 'editor' ),
		'capability_type' => 'page',
		'capabilities'    => array( 'create_posts' => 'do_not_allow' ),
		'map_meta_cap'    => true,
	) );
} );

function wolf_form_fields() {
	return array( 'namn', 'foretag', 'epost', 'telefon', 'amne', 'meddelande' );
}

add_shortcode( 'wolf_kontaktformular', function () {
	$state  = array();
	$token  = isset( $_GET['wolf_form'] ) ? sanitize_key( wp_unslash( $_GET['wolf_form'] ) ) : '';
	if ( $token ) {
		$state = (array) get_transient( 'wolf_form_' . $token );
	}
	$values = $state['values'] ?? array();
	$errors = $state['errors'] ?? array();
	$sent   = ! empty( $state['sent'] );

	if ( empty( $values['amne'] ) && isset( $_GET['amne'] ) ) {
		$values['amne'] = sanitize_text_field( wp_unslash( $_GET['amne'] ) );
	}
	$v = function ( $key ) use ( $values ) {
		return esc_attr( $values[ $key ] ?? '' );
	};
	$err = function ( $key ) use ( $errors ) {
		return isset( $errors[ $key ] ) ? sprintf( '<p class="wolf-field__error" id="fel-%1$s">%2$s</p>', esc_attr( $key ), esc_html( $errors[ $key ] ) ) : '';
	};
	$aria = function ( $key ) use ( $errors ) {
		return isset( $errors[ $key ] ) ? sprintf( ' aria-invalid="true" aria-describedby="fel-%s"', esc_attr( $key ) ) : '';
	};

	ob_start();
	echo '<div class="wolf-form-wrap" id="kontaktformular">';

	if ( $sent ) {
		echo '<div class="wolf-notice wolf-notice--success" role="status" tabindex="-1"><h3>Tack för ert meddelande</h3><p>Vi har tagit emot det och återkommer så snart vi kan.</p></div></div>';
		return ob_get_clean();
	}
	if ( isset( $errors['_form'] ) ) {
		printf( '<div class="wolf-notice wolf-notice--error" role="alert">%s</div>', esc_html( $errors['_form'] ) );
	} elseif ( $errors ) {
		echo '<div class="wolf-notice wolf-notice--error" role="alert">Kontrollera de markerade fälten och försök igen.</div>';
	}

	$subjects = array_filter( array_map( 'trim', explode( "\n", (string) wolf_opt( 'amnen' ) ) ) );
	if ( ! empty( $values['amne'] ) && ! in_array( $values['amne'], $subjects, true ) ) {
		$subjects[] = $values['amne'];
	}
	?>
	<form class="wolf-form" method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>" novalidate>
		<input type="hidden" name="action" value="wolf_kontakt">
		<input type="hidden" name="wolf_tid" value="<?php echo esc_attr( time() ); ?>">
		<input type="hidden" name="wolf_retur" value="<?php echo esc_url( get_permalink() ); ?>">
		<div class="wolf-form__row">
			<div class="wolf-field">
				<label for="wolf-namn">Namn <span aria-hidden="true">*</span></label>
				<input id="wolf-namn" name="namn" type="text" autocomplete="name" required value="<?php echo $v( 'namn' ); ?>"<?php echo $aria( 'namn' ); ?>>
				<?php echo $err( 'namn' ); ?>
			</div>
			<div class="wolf-field">
				<label for="wolf-foretag">Företag</label>
				<input id="wolf-foretag" name="foretag" type="text" autocomplete="organization" value="<?php echo $v( 'foretag' ); ?>">
			</div>
		</div>
		<div class="wolf-form__row">
			<div class="wolf-field">
				<label for="wolf-epost">E-post <span aria-hidden="true">*</span></label>
				<input id="wolf-epost" name="epost" type="email" autocomplete="email" required value="<?php echo $v( 'epost' ); ?>"<?php echo $aria( 'epost' ); ?>>
				<?php echo $err( 'epost' ); ?>
			</div>
			<div class="wolf-field">
				<label for="wolf-telefon">Telefon</label>
				<input id="wolf-telefon" name="telefon" type="tel" autocomplete="tel" value="<?php echo $v( 'telefon' ); ?>">
			</div>
		</div>
		<?php if ( $subjects ) : ?>
			<div class="wolf-field">
				<label for="wolf-amne">Ämne</label>
				<select id="wolf-amne" name="amne">
					<?php foreach ( $subjects as $s ) : ?>
						<option value="<?php echo esc_attr( $s ); ?>" <?php selected( $values['amne'] ?? '', $s ); ?>><?php echo esc_html( $s ); ?></option>
					<?php endforeach; ?>
				</select>
			</div>
		<?php endif; ?>
		<div class="wolf-field">
			<label for="wolf-meddelande">Meddelande <span aria-hidden="true">*</span></label>
			<textarea id="wolf-meddelande" name="meddelande" rows="6" required<?php echo $aria( 'meddelande' ); ?>><?php echo esc_textarea( $values['meddelande'] ?? '' ); ?></textarea>
			<?php echo $err( 'meddelande' ); ?>
		</div>
		<div class="wolf-hp" aria-hidden="true">
			<label for="wolf-webbplats">Lämna detta fält tomt</label>
			<input id="wolf-webbplats" name="webbplats" type="text" tabindex="-1" autocomplete="off">
		</div>
		<div class="wolf-form__footer">
			<p class="wolf-field__hint">
				Fält markerade med * är obligatoriska. Vi använder uppgifterna bara för att besvara er förfrågan.
				<?php
				$privacy = get_privacy_policy_url();
				if ( $privacy ) {
					printf( ' <a href="%s">Läs vår integritetspolicy</a>.', esc_url( $privacy ) );
				}
				?>
			</p>
			<div class="wp-block-button"><button type="submit" class="wp-block-button__link wp-element-button">Skicka meddelande</button></div>
		</div>
	</form>
	</div>
	<?php
	return ob_get_clean();
} );

function wolf_handle_contact() {
	$back = isset( $_POST['wolf_retur'] ) ? esc_url_raw( wp_unslash( $_POST['wolf_retur'] ) ) : home_url( '/' );
	$back = wp_validate_redirect( $back, home_url( '/' ) );

	$values = array();
	foreach ( wolf_form_fields() as $f ) {
		$raw          = isset( $_POST[ $f ] ) ? wp_unslash( $_POST[ $f ] ) : '';
		$values[ $f ] = 'meddelande' === $f ? sanitize_textarea_field( $raw ) : sanitize_text_field( $raw );
	}

	$errors = array();
	$is_bot = ! empty( $_POST['webbplats'] ) || ( time() - absint( $_POST['wolf_tid'] ?? 0 ) ) < 3;
	if ( '' === $values['namn'] ) {
		$errors['namn'] = 'Fyll i ert namn.';
	}
	if ( ! is_email( $values['epost'] ) ) {
		$errors['epost'] = 'Fyll i en giltig e-postadress.';
	}
	if ( mb_strlen( $values['meddelande'] ) < 5 ) {
		$errors['meddelande'] = 'Skriv ett meddelande.';
	}

	$state = array( 'values' => $values, 'errors' => $errors );

	if ( ! $errors && ! $is_bot ) {
		$lines = array(
			'Namn: ' . $values['namn'],
			'Företag: ' . $values['foretag'],
			'E-post: ' . $values['epost'],
			'Telefon: ' . $values['telefon'],
			'Ämne: ' . $values['amne'],
			'',
			$values['meddelande'],
			'',
			'Skickat från ' . $back,
		);
		$body    = implode( "\n", $lines );
		$subject = sprintf( 'Förfrågan via webbplatsen: %s', $values['amne'] ? $values['amne'] : $values['namn'] );

		wp_insert_post( array(
			'post_type'    => 'wolf_meddelande',
			'post_status'  => 'private',
			'post_title'   => $values['namn'] . ( $values['amne'] ? ' – ' . $values['amne'] : '' ),
			'post_content' => $body,
		) );

		$to = wolf_opt( 'epost' ) ? wolf_opt( 'epost' ) : get_option( 'admin_email' );
		wp_mail( $to, $subject, $body, array( 'Reply-To: ' . $values['namn'] . ' <' . $values['epost'] . '>' ) );

		$state = array( 'sent' => true );
	} elseif ( $is_bot && ! $errors ) {
		$state = array( 'sent' => true ); // Visa samma tack som vanligt, men spara inget.
	}

	$token = wp_generate_password( 12, false );
	set_transient( 'wolf_form_' . strtolower( $token ), $state, 15 * MINUTE_IN_SECONDS );
	wp_safe_redirect( add_query_arg( 'wolf_form', strtolower( $token ), remove_query_arg( 'wolf_form', $back ) ) . '#kontaktformular' );
	exit;
}
add_action( 'admin_post_wolf_kontakt', 'wolf_handle_contact' );
add_action( 'admin_post_nopriv_wolf_kontakt', 'wolf_handle_contact' );
