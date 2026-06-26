/**
 * Wildlife Video Toggle
 *
 * Button behaviour:
 *  - Paused / ended  →  play and make visible
 *  - Playing         →  pause and hide
 *
 * Button label, aria-pressed, btn-icon, status dot, and status text are
 * all kept in sync with the actual video state so screen-reader users
 * are always informed of the current playback status.
 */

(function () {
  "use strict";

  const video       = document.getElementById("wildlifeVideo");
  const btn         = document.getElementById("toggleBtn");
  const btnIcon     = btn  ? btn.querySelector(".btn-icon")   : null;
  const statusDot   = document.getElementById("statusDot");
  const statusLabel = document.getElementById("statusLabel");

  if (!video || !btn) return;

  /** Sync all UI controls to the current playback state. */
  function syncUI() {
    const playing = !video.paused && !video.ended;

    if (btnIcon) btnIcon.textContent = playing ? "■" : "▶";

    // Update button text node (preserve the icon span)
    const textNode = Array.from(btn.childNodes).find(
      (n) => n.nodeType === Node.TEXT_NODE
    );
    if (textNode) textNode.textContent = playing ? " Pause / Hide Video" : " Play Video";

    btn.setAttribute("aria-pressed", String(playing));
    btn.classList.toggle("is-playing", playing);

    if (statusDot)   statusDot.classList.toggle("live", playing);
    if (statusLabel) statusLabel.textContent = playing ? "LIVE" : "STANDBY";
  }

  /** Handle the toggle button click. */
  btn.addEventListener("click", function () {
    if (video.paused || video.ended) {
      video.style.visibility = "visible";
      video.play().catch(function (err) {
        console.warn("Playback failed:", err);
      });
    } else {
      video.pause();
      video.style.visibility = "hidden";
    }
    syncUI();
  });

  // Stay in sync when the user interacts with the native video controls.
  video.addEventListener("play",  syncUI);
  video.addEventListener("pause", syncUI);
  video.addEventListener("ended", syncUI);
})();
