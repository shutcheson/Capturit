document.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM Content fully loaded."); // Log when DOM is fully loaded

  function startCountdown(containerSelector, countDownDate) {
    console.log(`Starting countdown for ${containerSelector}.`); // Log which countdown is being started

    const getElements = (selector) =>
      document.querySelector(containerSelector + " " + selector);

    // Update the countdown every second
    const timer = setInterval(function () {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      // Calculate days, hours, minutes, and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Select countdown elements within the specified container
      const daysEl = getElements(".days");
      const hoursEl = getElements(".hours");
      const minutesEl = getElements(".minutes");
      const secondsEl = getElements(".seconds");

      // Update the countdown elements
      daysEl.textContent = days.toString().padStart(2, "0");
      hoursEl.textContent = hours.toString().padStart(2, "0");
      minutesEl.textContent = minutes.toString().padStart(2, "0");
      secondsEl.textContent = seconds.toString().padStart(2, "0");

      // Log each update
      console.log(
        `Update: ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`
      );

      // If the countdown is over, clear the timer and display zeros
      if (distance < 0) {
        clearInterval(timer);
        daysEl.textContent = "00";
        hoursEl.textContent = "00";
        minutesEl.textContent = "00";
        secondsEl.textContent = "00";
        console.log("Countdown has ended.");
      }
    }, 1000);
  }

  // Set the date for the countdown
  const countDownDate = new Date("jul 01, 2024 00:00:00").getTime();

  // Initialize the countdown timers using their respective container selectors
  startCountdown(".countdown__timer--first", countDownDate);
  startCountdown(".countdown__timer--second", countDownDate);
  startCountdown(".countdown__timer--third", countDownDate);
});

//
// CTA slide to sign up function
//
document.addEventListener("DOMContentLoaded", () => {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  const smoothScrollTo = (element, offset = 0, duration = 1000) => {
    const targetPosition = element.getBoundingClientRect().top; // Position relative to viewport
    const startPosition = window.pageYOffset;
    const distance = targetPosition - offset; // Apply offset conditionally
    let startTime = null;

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const nextStep = easeInOutCubic(
        timeElapsed,
        startPosition,
        distance,
        duration
      );

      window.scrollTo(0, nextStep);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        let offset = 0; // Default offset for other sections

        // Apply an offset only for the 'Key Features' section
        if (targetId === "#featuresSection") {
          offset = 100; // Customize this value based on your layout and needs
        }

        smoothScrollTo(targetSection, offset);
      }
    });
  });
});

function easeInOutCubic(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t * t + b;
  t -= 2;
  return (c / 2) * (t * t * t + 2) + b;
}

//
// Banner arrow scroll
//
document.addEventListener("DOMContentLoaded", function () {
  const scrollDownButton = document.getElementById("scroll-down-arrow");

  scrollDownButton.addEventListener("click", function () {
    const aboutSection = document.getElementById("about-section");
    smoothScrollTo(aboutSection, 1000); // Adjust the duration as needed (in milliseconds)
  });

  function smoothScrollTo(target, duration) {
    const targetPosition = target.getBoundingClientRect().top;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeInOutCubic(progress);
      window.scrollTo(0, startPosition + distance * ease);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    }

    requestAnimationFrame(animation);
  }

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  }
});

//
// Hamburger nav
//
const hamburgerMenu = document.querySelector(".hamburger-menu");
const mobileNav = document.querySelector(".mobile-nav");
const mobileNavLinks = document.querySelectorAll(
  ".mobile-nav-links a, .nav-logo"
);

hamburgerMenu.addEventListener("click", () => {
  mobileNav.classList.toggle("show");
});

mobileNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (mobileNav.classList.contains("show")) {
      mobileNav.classList.remove("show");
    }
  });
});
