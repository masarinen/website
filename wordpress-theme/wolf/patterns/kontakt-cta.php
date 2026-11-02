<?php
/**
 * Title: Kontaktruta (mörk)
 * Slug: wolf/kontakt-cta
 * Categories: wolf-sektioner
 * Viewport Width: 1400
 */
?>
<!-- wp:group {"tagName":"section","align":"full","className":"wolf-sec wolf-cta","style":{"spacing":{"padding":{"top":"var:preset|spacing|60","bottom":"var:preset|spacing|60"}}},"backgroundColor":"navy","layout":{"type":"constrained"}} -->
<section class="wp-block-group alignfull wolf-sec wolf-cta has-navy-background-color has-background" style="padding-top:var(--wp--preset--spacing--60);padding-bottom:var(--wp--preset--spacing--60)"><!-- wp:image {"sizeSlug":"full","className":"wolf-cta__art"} -->
<figure class="wp-block-image size-full wolf-cta__art"><img src="<?php echo esc_url( get_theme_file_uri( 'assets/illustrations/hardcase-ljus.svg' ) ); ?>" alt=""/></figure>
<!-- /wp:image -->

<!-- wp:group {"className":"wolf-cta__inner","style":{"spacing":{"blockGap":"1.25rem"}},"layout":{"type":"flex","orientation":"vertical"}} -->
<div class="wp-block-group wolf-cta__inner"><!-- wp:paragraph {"className":"is-style-overrubrik"} -->
<p class="is-style-overrubrik">Förfrågningar</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"textColor":"ivory"} -->
<h2 class="wp-block-heading has-ivory-color has-text-color">Har ni ett projekt i åtanke?</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"className":"wolf-cta__text"} -->
<p class="wolf-cta__text">Berätta om vad som ska förvaras, bäras eller presenteras. Kontakta oss så diskuterar vi väskor och etuier anpassade efter era behov.</p>
<!-- /wp:paragraph -->

<!-- wp:group {"className":"wolf-cta__actions","style":{"spacing":{"blockGap":"1.25rem 2rem"}},"layout":{"type":"flex","flexWrap":"wrap","verticalAlignment":"center"}} -->
<div class="wp-block-group wolf-cta__actions"><!-- wp:buttons -->
<div class="wp-block-buttons"><!-- wp:button {"className":"is-style-ljus"} -->
<div class="wp-block-button is-style-ljus"><a class="wp-block-button__link wp-element-button" href="<?php echo esc_url( home_url( '/kontakt/' ) ); ?>">Kontakta oss</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons -->

<!-- wp:paragraph {"className":"wolf-cta__phone"} -->
<p class="wolf-cta__phone"><a href="tel:+4687360855">08-736 08 55</a></p>
<!-- /wp:paragraph --></div>
<!-- /wp:group --></div>
<!-- /wp:group --></section>
<!-- /wp:group -->
