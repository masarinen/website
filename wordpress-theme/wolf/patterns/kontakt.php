<?php
/**
 * Title: Kontaktuppgifter och formulär
 * Slug: wolf/kontakt
 * Categories: wolf-sektioner
 * Viewport Width: 1400
 */
?>
<!-- wp:group {"tagName":"section","align":"full","className":"wolf-sec wolf-contact","style":{"spacing":{"padding":{"top":"var:preset|spacing|20","bottom":"var:preset|spacing|20"}}},"layout":{"type":"constrained"}} -->
<section class="wp-block-group alignfull wolf-sec wolf-contact" style="padding-top:var(--wp--preset--spacing--20);padding-bottom:var(--wp--preset--spacing--20)"><!-- wp:columns {"align":"wide","style":{"spacing":{"blockGap":{"left":"clamp(2.5rem, 6vw, 6rem)"}}}} -->
<div class="wp-block-columns alignwide"><!-- wp:column {"width":"40%"} -->
<div class="wp-block-column" style="flex-basis:40%"><!-- wp:heading {"fontSize":"large"} -->
<h2 class="wp-block-heading has-large-font-size">Kontaktuppgifter</h2>
<!-- /wp:heading -->

<!-- wp:group {"className":"wolf-contact__list","style":{"spacing":{"blockGap":"0"}},"layout":{"type":"flex","orientation":"vertical"}} -->
<div class="wp-block-group wolf-contact__list"><!-- wp:group {"className":"wolf-contact__item","style":{"spacing":{"blockGap":"0.25rem"}},"layout":{"type":"flex","orientation":"vertical"}} -->
<div class="wp-block-group wolf-contact__item"><!-- wp:paragraph {"className":"wolf-contact__label"} -->
<p class="wolf-contact__label">Telefon</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"className":"wolf-contact__value"} -->
<p class="wolf-contact__value"><a href="tel:+4687360855">08-736 08 55</a></p>
<!-- /wp:paragraph --></div>
<!-- /wp:group -->

<!-- wp:group {"className":"wolf-contact__item","style":{"spacing":{"blockGap":"0.25rem"}},"layout":{"type":"flex","orientation":"vertical"}} -->
<div class="wp-block-group wolf-contact__item"><!-- wp:paragraph {"className":"wolf-contact__label"} -->
<p class="wolf-contact__label">E-post</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"className":"wolf-contact__value"} -->
<p class="wolf-contact__value"><a href="mailto:robert@wolf.se">robert@wolf.se</a></p>
<!-- /wp:paragraph --></div>
<!-- /wp:group -->

<!-- wp:group {"className":"wolf-contact__item","style":{"spacing":{"blockGap":"0.25rem"}},"layout":{"type":"flex","orientation":"vertical"}} -->
<div class="wp-block-group wolf-contact__item"><!-- wp:paragraph {"className":"wolf-contact__label"} -->
<p class="wolf-contact__label">Adress</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"className":"wolf-contact__value"} -->
<p class="wolf-contact__value">Stockholms Etui- &amp; Koffertfabrik Wolf AB<br>Roslagsvägen 120<br>184 91 Åkersberga</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group --></div>
<!-- /wp:group -->

<!-- wp:paragraph {"textColor":"muted","fontSize":"small"} -->
<p class="has-muted-color has-text-color has-small-font-size">Söker ni en produkt ur vårt sortiment? Se <a href="<?php echo esc_url( home_url( '/sortiment/' ) ); ?>">hela sortimentet</a>. Alla produkter kan levereras till adresser i hela Norden.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

<!-- wp:column {"width":"60%"} -->
<div class="wp-block-column" style="flex-basis:60%"><!-- wp:heading {"fontSize":"large"} -->
<h2 class="wp-block-heading has-large-font-size">Skicka ett meddelande</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"textColor":"muted","fontSize":"small"} -->
<p class="has-muted-color has-text-color has-small-font-size">Vi besvarar förfrågningar via e-post eller telefon.</p>
<!-- /wp:paragraph -->

<!-- wp:shortcode -->
[wolf_kontaktformular]
<!-- /wp:shortcode --></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></section>
<!-- /wp:group -->
