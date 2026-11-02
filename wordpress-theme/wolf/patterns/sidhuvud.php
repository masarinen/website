<?php
/**
 * Title: Sidhuvud
 * Slug: wolf/sidhuvud
 * Inserter: no
 * Viewport Width: 1400
 */
?>
<!-- wp:group {"className":"wolf-header","style":{"spacing":{"padding":{"top":"0","bottom":"0"}}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group wolf-header" style="padding-top:0;padding-bottom:0"><!-- wp:group {"align":"wide","className":"wolf-header__inner","layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"space-between","verticalAlignment":"center"}} -->
<div class="wp-block-group alignwide wolf-header__inner"><!-- wp:paragraph {"className":"wolf-logo"} -->
<p class="wolf-logo"><a href="<?php echo esc_url( home_url( '/' ) ); ?>">WOLF</a></p>
<!-- /wp:paragraph -->

<!-- wp:navigation {"className":"wolf-nav","style":{"spacing":{"blockGap":"1.75rem"}},"layout":{"type":"flex","justifyContent":"right"}} -->
<!-- wp:navigation-link {"label":"Startsida","url":"<?php echo esc_url( home_url( '/' ) ); ?>","kind":"custom","isTopLevelLink":true} /-->

<!-- wp:navigation-link {"label":"Specialtillverkade väskor","url":"<?php echo esc_url( home_url( '/specialtillverkade-vaskor/' ) ); ?>","kind":"custom","isTopLevelLink":true} /-->

<!-- wp:navigation-submenu {"label":"Sortiment","url":"<?php echo esc_url( home_url( '/sortiment/' ) ); ?>","kind":"custom"} -->
<!-- wp:navigation-link {"label":"WOLF","url":"<?php echo esc_url( home_url( '/wolf/' ) ); ?>","kind":"custom"} /-->

<!-- wp:navigation-link {"label":"Samsonite","url":"<?php echo esc_url( home_url( '/samsonite/' ) ); ?>","kind":"custom"} /-->

<!-- wp:navigation-link {"label":"Hela sortimentet","url":"<?php echo esc_url( home_url( '/sortiment/' ) ); ?>","kind":"custom"} /-->
<!-- /wp:navigation-submenu -->

<!-- wp:navigation-link {"label":"Om oss","url":"<?php echo esc_url( home_url( '/om-oss/' ) ); ?>","kind":"custom","isTopLevelLink":true} /-->

<!-- wp:navigation-link {"label":"Kontakt","url":"<?php echo esc_url( home_url( '/kontakt/' ) ); ?>","kind":"custom","isTopLevelLink":true} /-->
<!-- /wp:navigation --></div>
<!-- /wp:group --></div>
<!-- /wp:group -->
