document.addEventListener("DOMContentLoaded", () => {
  const mobileBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuOpenState = document.getElementById("menu-open-state");
  const menuCloseState = document.getElementById("menu-close-state");
  const mainNav = document.getElementById("main-nav");
  const navBgGradient = document.getElementById("nav-bg-gradient");

  if (mobileBtn) {
    mobileBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
      mainNav.classList.toggle("bg-white/10");
      if (navBgGradient) {
        navBgGradient.classList.toggle("hidden");
      }
      if (menuOpenState && menuCloseState) {
        menuOpenState.classList.toggle("hidden");
        menuCloseState.classList.toggle("hidden");
      }
    });
  }

  const profileBtn = document.getElementById("th-profile-btn");
  const profileDropdown = document.getElementById("th-profile-dropdown");

  if (profileBtn && profileDropdown) {
    profileBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isHidden = profileDropdown.classList.contains("hidden");

      if (isHidden) {
        profileDropdown.classList.remove("hidden");
        setTimeout(() => {
          profileDropdown.classList.remove("opacity-0", "translate-y-1");
        }, 10);
      } else {
        profileDropdown.classList.add("opacity-0", "translate-y-1");
        setTimeout(() => {
          profileDropdown.classList.add("hidden");
        }, 150);
      }
    });

    document.addEventListener("click", (e) => {
      if (
        !profileDropdown.contains(e.target) &&
        !profileBtn.contains(e.target)
      ) {
        if (!profileDropdown.classList.contains("hidden")) {
          profileDropdown.classList.add("opacity-0", "translate-y-1");
          setTimeout(() => {
            profileDropdown.classList.add("hidden");
          }, 150);
        }
      }
    });
  }

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const revealElements = document.querySelectorAll(".reveal");
  revealElements.forEach((el) => observer.observe(el));

  const heroVideo = document.querySelector("video");
  if (heroVideo) {
    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            heroVideo
              .play()
              .catch((error) => console.log("Auto-play prevented:", error));
          } else {
            heroVideo.pause();
          }
        });
      },
      { threshold: 0.1 },
    );

    videoObserver.observe(heroVideo);
  }
});
