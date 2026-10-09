/* Wolf – temaskript: mobilmeny, headerkant vid scroll, in-animationer,
   antalväljare och validering av kontaktformuläret. */
(function () {
  "use strict";

  /* ---------- Header ---------- */
  var header = document.querySelector("[data-header]");
  if (header) {
    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 8); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    var toggle = header.querySelector("[data-menu-toggle]");
    var panel = document.getElementById(toggle ? toggle.getAttribute("aria-controls") : "");
    if (toggle && panel) {
      var setOpen = function (open) {
        toggle.setAttribute("aria-expanded", String(open));
        toggle.querySelector("[data-menu-label]").textContent = open ? "Stäng menyn" : "Öppna menyn";
        panel.hidden = !open;
        header.classList.toggle("is-open", open);
        document.body.style.overflow = open ? "hidden" : "";
        if (open) {
          var first = panel.querySelector("a");
          if (first) first.focus();
        }
      };
      toggle.addEventListener("click", function () {
        setOpen(toggle.getAttribute("aria-expanded") !== "true");
      });
      document.addEventListener("keydown", function (e) {
        if (toggle.getAttribute("aria-expanded") !== "true") return;
        if (e.key === "Escape") { setOpen(false); toggle.focus(); }
        if (e.key === "Tab") {
          var items = [toggle].concat(Array.prototype.slice.call(panel.querySelectorAll("a")));
          var firstEl = items[0], lastEl = items[items.length - 1];
          if (e.shiftKey && document.activeElement === firstEl) { e.preventDefault(); lastEl.focus(); }
          else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); firstEl.focus(); }
        }
      });
      window.matchMedia("(min-width: 1024px)").addEventListener("change", function (mq) {
        if (mq.matches) setOpen(false);
      });
    }
  }

  /* ---------- In-animationer ---------- */
  function reveal(root) {
    var els = (root || document).querySelectorAll("[data-reveal]:not(.is-visible)");
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); io.unobserve(entry.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
  }
  reveal();
  document.addEventListener("shopify:section:load", function (e) { reveal(e.target); });

  /* ---------- Antalväljare ---------- */
  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-qty]");
    if (!btn) return;
    var input = btn.parentElement.querySelector("input");
    var min = parseInt(input.min || "0", 10);
    var next = Math.max(min, (parseInt(input.value, 10) || 0) + parseInt(btn.dataset.qty, 10));
    input.value = next;
    input.dispatchEvent(new Event("change", { bubbles: true }));
  });

  /* ---------- Formulärvalidering ---------- */
  var messages = {
    valueMissing: "Fyll i det här fältet.",
    typeMismatch: "Ange en giltig e-postadress, till exempel namn@foretag.se.",
    tooShort: function (el) { return "Skriv minst " + el.minLength + " tecken."; }
  };
  function validateField(el) {
    var errorEl = document.getElementById(el.id + "-error");
    var msg = "";
    if (!el.validity.valid) {
      if (el.validity.valueMissing) msg = el.dataset.missing || messages.valueMissing;
      else if (el.validity.typeMismatch) msg = messages.typeMismatch;
      else if (el.validity.tooShort) msg = messages.tooShort(el);
      else msg = el.validationMessage;
    }
    el.setAttribute("aria-invalid", msg ? "true" : "false");
    if (errorEl) { errorEl.textContent = msg; errorEl.hidden = !msg; }
    return !msg;
  }
  document.querySelectorAll("form[data-validate]").forEach(function (form) {
    form.setAttribute("novalidate", "");
    var fields = form.querySelectorAll("input:not([type=hidden]):not([tabindex='-1']), select, textarea");
    fields.forEach(function (el) {
      el.addEventListener("blur", function () { validateField(el); });
      el.addEventListener("input", function () { if (el.getAttribute("aria-invalid") === "true") validateField(el); });
    });
    var counter = form.querySelector("[data-counter]");
    var body = form.querySelector("textarea");
    if (counter && body) {
      var update = function () { counter.textContent = body.value.length + " / " + body.maxLength + " tecken"; };
      body.addEventListener("input", update); update();
    }
    form.addEventListener("submit", function (e) {
      var firstInvalid = null;
      fields.forEach(function (el) { if (!validateField(el) && !firstInvalid) firstInvalid = el; });
      var summary = form.querySelector("[data-error-summary]");
      if (firstInvalid) {
        e.preventDefault();
        if (summary) { summary.hidden = false; summary.textContent = "Några fält behöver kompletteras innan meddelandet kan skickas."; }
        firstInvalid.focus();
      } else {
        if (summary) summary.hidden = true;
        var submit = form.querySelector("[type=submit]");
        if (submit) { submit.disabled = true; submit.setAttribute("aria-busy", "true"); submit.firstChild.textContent = "Skickar… "; }
      }
    });
  });

  var focusTarget = document.querySelector("[data-focus-on-load]");
  if (focusTarget) focusTarget.focus();
})();
