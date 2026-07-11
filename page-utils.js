// Utility functions for all pages

// Page title display on scroll
function setupPageTitleDisplay() {
  const titleElement = document.querySelector("#headerPageTitle");
  if (!titleElement) return;
  const heroSection = document.querySelector(".hero");
  if (!heroSection) return;

  // Scroll detection
  function togglePageTitle() {
    const heroBottom = heroSection.getBoundingClientRect().bottom;
    if (heroBottom < 100) {
      titleElement.style.opacity = "1";
      titleElement.classList.remove("hidden");
      titleElement.classList.add("inline");
    } else {
      titleElement.style.opacity = "0";
      setTimeout(() => {
        titleElement.classList.add("hidden");
      }, 300);
      titleElement.classList.remove("inline");
    }
  }

  window.addEventListener("scroll", togglePageTitle);
  togglePageTitle(); // Initial check
}

// Initialize on DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupPageTitleDisplay);
} else {
  setupPageTitleDisplay();
}
