<?php
/**
 * WooCommerce (valfritt tillägg).
 *
 * - [wolf_produkter kategori="wolf"] visar produkterna i en produktkategori.
 * - Produkter från märken under Inställningar → Wolf (standard Samsonite)
 *   får texten "Rek. utpris" före priset och en uppmaning att kontakta oss.
 * - Katalogläge: utan bockad "Webbutik" visas priser men ingen köpknapp.
 * - Företagskunder: användarrollen Företagskund med en egen rabatt i procent
 *   (Användare → välj kund → "Rabatt för företagskund"). Inloggade
 *   företagskunder ser sitt pris direkt, med rek. utpris överstruket.
 */

defined( 'ABSPATH' ) || exit;

/* Rollen finns även utan WooCommerce, så att kunder kan läggas upp i förväg. */
add_action( 'after_switch_theme', 'wolf_add_b2b_role' );
add_action( 'admin_init', function () {
	if ( ! get_role( 'foretagskund' ) ) {
		wolf_add_b2b_role();
	}
} );
function wolf_add_b2b_role() {
	$customer = get_role( 'customer' );
	add_role( 'foretagskund', 'Företagskund', $customer ? $customer->capabilities : array( 'read' => true ) );
}

add_shortcode( 'wolf_produkter', function ( $atts ) {
	$atts = shortcode_atts( array( 'kategori' => '', 'antal' => 24, 'kolumner' => 4 ), $atts );
	if ( ! class_exists( 'WooCommerce' ) ) {
		return current_user_can( 'edit_pages' )
			? '<p class="wolf-notice">Här visas produkterna när WooCommerce är installerat och det finns en produktkategori med adressen <code>' . esc_html( $atts['kategori'] ) . '</code>. (Den här rutan syns bara för er som är inloggade.)</p>'
			: '';
	}
	return do_shortcode( sprintf(
		'[products category="%s" limit="%d" columns="%d" paginate="true" orderby="menu_order title" order="ASC"]',
		esc_attr( sanitize_title( $atts['kategori'] ) ),
		absint( $atts['antal'] ),
		absint( $atts['kolumner'] )
	) );
} );

if ( ! class_exists( 'WooCommerce' ) ) {
	return;
}

/** Hör produkten till ett märke med rekommenderat utpris? */
function wolf_is_rrp_product( $product ) {
	$brands = array_filter( array_map( 'trim', explode( ',', strtolower( (string) wolf_opt( 'rrp_marken' ) ) ) ) );
	if ( ! $brands || ! $product ) {
		return false;
	}
	$id    = $product->get_parent_id() ? $product->get_parent_id() : $product->get_id();
	$terms = array();
	foreach ( array( 'product_cat', 'product_brand' ) as $tax ) {
		if ( taxonomy_exists( $tax ) ) {
			$terms = array_merge( $terms, (array) wp_get_post_terms( $id, $tax, array( 'fields' => 'names' ) ) );
		}
	}
	foreach ( $terms as $name ) {
		if ( in_array( strtolower( trim( $name ) ), $brands, true ) ) {
			return true;
		}
	}
	return false;
}

/** Rabatt i procent för inloggad företagskund (0 om ingen). */
function wolf_b2b_discount() {
	static $discount = null;
	if ( null !== $discount ) {
		return $discount;
	}
	$discount = 0.0;
	$user     = wp_get_current_user();
	if ( $user->exists() && in_array( 'foretagskund', (array) $user->roles, true ) ) {
		$discount = min( 100, max( 0, (float) get_user_meta( $user->ID, 'wolf_rabatt', true ) ) );
	}
	return $discount;
}

function wolf_is_b2b() {
	$user = wp_get_current_user();
	return $user->exists() && in_array( 'foretagskund', (array) $user->roles, true );
}

/* Företagskundens pris: rabatten dras från ordinarie pris. */
function wolf_apply_discount( $price, $product ) {
	$d = wolf_b2b_discount();
	if ( $d <= 0 || '' === $price || null === $price || is_admin() && ! wp_doing_ajax() ) {
		return $price;
	}
	$regular = (float) $product->get_regular_price( 'edit' );
	$base    = $regular > 0 ? $regular : (float) $price;
	return (string) wc_format_decimal( $base * ( 1 - $d / 100 ), wc_get_price_decimals() );
}
foreach ( array( 'woocommerce_product_get_price', 'woocommerce_product_variation_get_price' ) as $hook ) {
	add_filter( $hook, 'wolf_apply_discount', 20, 2 );
}
add_filter( 'woocommerce_variation_prices_price', 'wolf_apply_discount', 20, 2 );
add_filter( 'woocommerce_get_variation_prices_hash', function ( $hash ) {
	$hash[] = 'wolf-' . wolf_b2b_discount();
	return $hash;
} );
/* Under rabatt ska produkten inte samtidigt räknas som "på rea". */
add_filter( 'woocommerce_product_is_on_sale', function ( $on_sale ) {
	return wolf_b2b_discount() > 0 ? false : $on_sale;
}, 20 );

add_filter( 'woocommerce_get_price_html', function ( $html, $product ) {
	if ( '' === $html ) {
		return $html;
	}
	if ( wolf_b2b_discount() > 0 && ! $product->is_type( 'variable' ) && ! $product->is_type( 'grouped' ) ) {
		$regular = (float) $product->get_regular_price();
		$yours   = (float) $product->get_price();
		if ( $regular > $yours ) {
			return '<span class="wolf-price-label">Ditt pris</span> ' . wc_format_sale_price( wc_get_price_to_display( $product, array( 'price' => $regular ) ), wc_get_price_to_display( $product ) ) . $product->get_price_suffix();
		}
	}
	if ( wolf_is_rrp_product( $product ) && ! wolf_b2b_discount() ) {
		$html = '<span class="wolf-price-label">' . esc_html( wolf_opt( 'rrp_etikett' ) ) . '</span> ' . $html;
	}
	return $html;
}, 20, 2 );

/* Katalogläge: priser visas men ingen köpknapp. */
add_filter( 'woocommerce_is_purchasable', function ( $purchasable ) {
	return wolf_opt( 'kopknapp' ) ? $purchasable : false;
}, 20 );

/** Texten under priset på produktsidan. */
function wolf_price_note( $product ) {
	$contact = add_query_arg( 'amne', 'Fråga om sortimentet', home_url( '/kontakt/' ) );
	$out     = '';
	if ( wolf_is_b2b() ) {
		$out .= '<p class="wolf-price-note wolf-price-note--b2b">' . esc_html( wolf_opt( 'b2b_text' ) ) . '</p>';
	} elseif ( wolf_is_rrp_product( $product ) ) {
		$out .= '<p class="wolf-price-note">' . esc_html( wolf_opt( 'rrp_text' ) ) . ' <a href="' . esc_url( $contact ) . '">Kontakta oss</a>';
		if ( ! is_user_logged_in() ) {
			$out .= ' · <a href="' . esc_url( wc_get_page_permalink( 'myaccount' ) ) . '">Logga in som företagskund</a>';
		}
		$out .= '</p>';
	}
	if ( ! wolf_opt( 'kopknapp' ) ) {
		$out .= '<div class="wp-block-buttons wolf-price-cta"><div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="' . esc_url( add_query_arg( 'amne', 'Fråga om ' . $product->get_name(), home_url( '/kontakt/' ) ) ) . '">Fråga om produkten</a></div></div>';
	}
	return $out;
}

/* Visas en gång, oavsett om produktsidan är byggd med block eller klassiskt. */
function wolf_print_price_note_once( $product = null ) {
	static $done = false;
	$product = $product ? $product : wc_get_product( get_queried_object_id() );
	if ( $done || ! $product ) {
		return '';
	}
	$done = true;
	return wolf_price_note( $product );
}
add_action( 'woocommerce_single_product_summary', function () {
	global $product;
	echo wolf_print_price_note_once( $product ); // phpcs:ignore WordPress.Security.EscapeOutput -- byggs med esc_* ovan.
}, 11 );
add_filter( 'render_block_woocommerce/product-price', function ( $content, $block, $instance = null ) {
	if ( ! is_product() ) {
		return $content;
	}
	$post_id = ( $instance && isset( $instance->context['postId'] ) ) ? (int) $instance->context['postId'] : get_the_ID();
	if ( $post_id !== (int) get_queried_object_id() ) {
		return $content;
	}
	return $content . wolf_print_price_note_once( wc_get_product( $post_id ) );
}, 10, 3 );

/* Rabattfält på användarprofilen (bara för administratörer). */
function wolf_user_discount_field( $user ) {
	if ( ! current_user_can( 'edit_users' ) ) {
		return;
	}
	?>
	<h2>Företagskund</h2>
	<table class="form-table" role="presentation">
		<tr>
			<th><label for="wolf_rabatt">Rabatt för företagskund (%)</label></th>
			<td>
				<input type="number" min="0" max="100" step="0.5" name="wolf_rabatt" id="wolf_rabatt" value="<?php echo esc_attr( get_user_meta( $user->ID, 'wolf_rabatt', true ) ); ?>" class="small-text">
				<p class="description">Gäller när användaren har rollen Företagskund. Rabatten dras från ordinarie pris (rek. utpris) på alla produkter.</p>
			</td>
		</tr>
	</table>
	<?php
}
add_action( 'show_user_profile', 'wolf_user_discount_field' );
add_action( 'edit_user_profile', 'wolf_user_discount_field' );
function wolf_save_user_discount( $user_id ) {
	if ( ! current_user_can( 'edit_users' ) || ! isset( $_POST['wolf_rabatt'] ) ) {
		return;
	}
	check_admin_referer( 'update-user_' . $user_id );
	update_user_meta( $user_id, 'wolf_rabatt', min( 100, max( 0, (float) wp_unslash( $_POST['wolf_rabatt'] ) ) ) );
}
add_action( 'personal_options_update', 'wolf_save_user_discount' );
add_action( 'edit_user_profile_update', 'wolf_save_user_discount' );
