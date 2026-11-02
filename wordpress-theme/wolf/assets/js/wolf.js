/* Wolf: förvalt ämne i kontaktformuläret (?amne=…) och en kantlinje under
   sidhuvudet när sidan har scrollats. */
(function () {
  var header = document.querySelector(".wolf-header");
  if (header) {
    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 8); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }
})();
