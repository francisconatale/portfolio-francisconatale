function initClientsInteraction() {
  const clientEls = document.querySelectorAll(".js-client");
  const imgItems = document.querySelectorAll(".client-img-item");
  const statements = document.querySelectorAll(".client-statement");

  if (!clientEls.length) return;

  function activate(clientName) {
    clientEls.forEach((el) => {
      el.classList.toggle("is-active", el.dataset.client === clientName);
    });

    imgItems.forEach((img) => {
      const isTarget = img.dataset.for === clientName;
      gsap.to(img, {
        opacity: isTarget ? 1 : 0,
        scale: isTarget ? 1 : 0.95,
        duration: 0.4,
        ease: "power2.out",
      });
    });

    statements.forEach((s) => {
      s.classList.toggle("is-active", s.dataset.for === clientName);
    });
  }

  // Default to first
  if (clientEls[0]) {
    activate(clientEls[0].dataset.client);
  }

  clientEls.forEach((el) => {
    el.addEventListener("mouseenter", () => activate(el.dataset.client));
  });
}

function initClientsHeading() {
  const heading = document.getElementById("clientsHeading");
  if (!heading) return;

  gsap.fromTo(
    heading,
    { scale: 0.92, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: 1.2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: heading,
        start: "top 80%",
      },
    }
  );
}

// Ensure GSAP is loaded before initializing
window.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    initClientsInteraction();
    initClientsHeading();
  } else {
    console.error("GSAP is not loaded. Please include it in your HTML.");
  }
});
