/**
 * Wildlife Video Toggle
 *
 * Clicking the button:
 *  - If the video is paused (or ended), play it and show it.
 *  - If the video is playing, pause it and hide it.
 *
 * The button label and aria-pressed attribute are kept in sync
 * with the actual video state so screen-reader users are always
 * informed of the current status.
 */

(function () {
  "use strict";

  const video = document.getElementById("wildlifeVideo");
  const btn = document.getElementById("toggleBtn");

  if (!video || !btn) return;

  /**
   * Sync the button's visible label and ARIA state to the current
   * playback state of the video.
   */
  function syncButton() {
    const playing = !video.paused && !video.ended;
    btn.textContent = playing ? "⏸ Hide / Pause Video" : "▶ Play Video";
    btn.setAttribute("aria-pressed", String(playing));
    btn.classList.toggle("is-playing", playing);
  }

  /** Handle the toggle button click */
  btn.addEventListener("click", function () {
    if (video.paused || video.ended) {
      // Ensure the video is visible before playing
      video.style.visibility = "visible";
      video.play().catch(function (err) {
        console.warn("Playback failed:", err);
      });
    } else {
      video.pause();
      // Hide the video after pausing
      video.style.visibility = "hidden";
    }
    syncButton();
  });

  // Keep the button in sync when video state changes through
  // the native controls (play/pause clicks on the video itself).
  video.addEventListener("play", syncButton);
  video.addEventListener("pause", syncButton);
  video.addEventListener("ended", syncButton);
})();
