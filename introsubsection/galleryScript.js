document.addEventListener("DOMContentLoaded", () => {
  const galleryItems = document.querySelectorAll(".gallery-item");

  const fadeInOnScroll = () => {
    const windowBottom = window.innerHeight + window.scrollY;
    galleryItems.forEach(item => {
      const itemTop = item.offsetTop;
      if (windowBottom > itemTop + 50) { // Trigger a little earlier than the element
        item.classList.add("show");
      }
    });
  };

  window.addEventListener("scroll", fadeInOnScroll);
  fadeInOnScroll(); // Initial check in case items are already visible
});