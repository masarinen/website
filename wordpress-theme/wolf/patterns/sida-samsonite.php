<?php
/**
 * Title: Samsonite (märkessida)
 * Slug: wolf/sida-samsonite
 * Categories: wolf-sidor
 * Block Types: core/post-content
 * Post Types: page
 * Viewport Width: 1400
 */
?>
<!-- wp:group {"align":"full","className":"wolf-sec wolf-pagehero","style":{"spacing":{"padding":{"top":"var:preset|spacing|50","bottom":"var:preset|spacing|50"}}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull wolf-sec wolf-pagehero" style="padding-top:var(--wp--preset--spacing--50);padding-bottom:var(--wp--preset--spacing--50)"><!-- wp:group {"align":"wide","className":"wolf-pagehero__inner","style":{"spacing":{"blockGap":"1.5rem"}},"layout":{"type":"flex","orientation":"vertical"}} -->
<div class="wp-block-group alignwide wolf-pagehero__inner"><!-- wp:paragraph {"className":"is-style-overrubrik"} -->
<p class="is-style-overrubrik">Märke</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":1} -->
<h1 class="wp-block-heading">Samsonite</h1>
<!-- /wp:heading -->

<!-- wp:paragraph {"textColor":"muted","fontSize":"lede"} -->
<p class="has-muted-color has-text-color has-lede-font-size">Priserna är Samsonites rekommenderade utpriser. Kontakta oss för uppdaterade priser.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group --></div>
<!-- /wp:group -->

<!-- wp:group {"tagName":"section","align":"full","className":"wolf-sec wolf-products","style":{"spacing":{"padding":{"top":"0","bottom":"0"}}},"layout":{"type":"constrained"}} -->
<section class="wp-block-group alignfull wolf-sec wolf-products" style="padding-top:0;padding-bottom:0"><!-- wp:group {"align":"wide","layout":{"type":"default"}} -->
<div class="wp-block-group alignwide"><!-- wp:shortcode -->
[wolf_produkter kategori="samsonite"]
<!-- /wp:shortcode --></div>
<!-- /wp:group --></section>
<!-- /wp:group -->

<!-- wp:group {"tagName":"section","align":"full","className":"wolf-sec wolf-brandabout","style":{"spacing":{"padding":{"top":"var:preset|spacing|60","bottom":"var:preset|spacing|60"}}},"backgroundColor":"bone","layout":{"type":"constrained"}} -->
<section class="wp-block-group alignfull wolf-sec wolf-brandabout has-bone-background-color has-background" style="padding-top:var(--wp--preset--spacing--60);padding-bottom:var(--wp--preset--spacing--60)"><!-- wp:columns {"verticalAlignment":"center","align":"wide","style":{"spacing":{"blockGap":{"left":"clamp(2.5rem, 6vw, 4rem)"}}}} -->
<div class="wp-block-columns alignwide are-vertically-aligned-center"><!-- wp:column {"width":"50%"} -->
<div class="wp-block-column" style="flex-basis:50%"><!-- wp:image {"sizeSlug":"full","className":"wolf-media wolf-media\u002d\u002dwide"} -->
<figure class="wp-block-image size-full wolf-media wolf-media--wide"><img src="<?php echo esc_url( get_theme_file_uri( 'assets/illustrations/briefcase.svg' ) ); ?>" alt=""/></figure>
<!-- /wp:image --></div>
<!-- /wp:column -->

<!-- wp:column {"verticalAlignment":"center","width":"50%"} -->
<div class="wp-block-column is-vertically-aligned-center" style="flex-basis:50%"><!-- wp:paragraph {"className":"is-style-overrubrik"} -->
<p class="is-style-overrubrik">Om märket</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">Samsonite</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"textColor":"muted","fontSize":"lede"} -->
<p class="has-muted-color has-text-color has-lede-font-size">Samsonite grundades 1910 i Denver, USA, och är i dag ett av världens mest kända märken för väskor och resetillbehör.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"textColor":"muted","fontSize":"lede"} -->
<p class="has-muted-color has-text-color has-lede-font-size">Priserna på den här sidan är Samsonites rekommenderade utpriser. Kontakta oss för uppdaterade priser och tillgänglighet. Är ni företagskund med avtal kan ni logga in för att se era priser.</p>
<!-- /wp:paragraph -->

<!-- wp:buttons -->
<div class="wp-block-buttons"><!-- wp:button {"className":"is-style-outline"} -->
<div class="wp-block-button is-style-outline"><a class="wp-block-button__link wp-element-button" href="<?php echo esc_url( home_url( '/sortiment/' ) ); ?>">Hela sortimentet</a></div>
<!-- /wp:button -->

<!-- wp:button -->
<div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="<?php echo esc_url( home_url( '/kontakt/?amne=Fråga om sortimentet' ) ); ?>">Kontakta oss för pris</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></section>
<!-- /wp:group -->

<!-- wp:group {"tagName":"section","align":"full","className":"wolf-sec wolf-cta","style":{"spacing":{"padding":{"top":"var:preset|spacing|60","bottom":"var:preset|spacing|60"}}},"backgroundColor":"navy","layout":{"type":"constrained"}} -->
<section class="wp-block-group alignfull wolf-sec wolf-cta has-navy-background-color has-background" style="padding-top:var(--wp--preset--spacing--60);padding-bottom:var(--wp--preset--spacing--60)"><!-- wp:group {"className":"wolf-cta__inner","style":{"spacing":{"blockGap":"1.25rem"}},"layout":{"type":"flex","orientation":"vertical"}} -->
<div class="wp-block-group wolf-cta__inner"><!-- wp:paragraph {"className":"is-style-overrubrik"} -->
<p class="is-style-overrubrik">Rådgivning</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"textColor":"ivory"} -->
<h2 class="wp-block-heading has-ivory-color has-text-color">Vill du ha ett aktuellt pris?</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"className":"wolf-cta__text"} -->
<p class="wolf-cta__text">Priserna som visas är rekommenderade utpriser. Hör av dig så lämnar vi ett aktuellt pris – även för större beställningar till företag.</p>
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
