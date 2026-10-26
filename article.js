/* ============================================================================
   article.js — the small amount of behaviour a written piece needs.
   Reading time, a progress bar along the top, and the year in the footer.
   The pieces are plain HTML, so nothing here is required for them to read
   correctly; it all degrades to nothing if the file fails to load.
   ========================================================================= */
(function () {
  "use strict";

  /* --- Reading time ------------------------------------------------------
     220 words a minute is the usual figure for adults reading prose on a
     screen. Rounded, never less than a minute.
     -------------------------------------------------------------------- */

  var body = document.querySelector(".article-body");
  var meta = document.querySelector(".article-meta");

  if (body && meta) {
    var words = body.textContent.trim().split(/\s+/).length;
    var minutes = Math.max(1, Math.round(words / 220));
    var note = document.createElement("span");
    note.className = "read-time";
    note.textContent = minutes + " min read";
    meta.appendChild(note);
  }

  /* --- Reading progress -------------------------------------------------- */

  var bar = document.createElement("div");
  bar.className = "progress";
  document.body.appendChild(bar);

  var ticking = false;
  function update() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var ratio = max > 0 ? window.scrollY / max : 0;
    bar.style.transform = "scaleX(" + Math.min(1, Math.max(0, ratio)) + ")";
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    },
    { passive: true }
  );
  window.addEventListener("resize", update, { passive: true });
  update();

  /* --- Footer ------------------------------------------------------------ */

  var year = document.getElementById("footer-year");
  if (year) year.textContent = new Date().getFullYear();
})();
