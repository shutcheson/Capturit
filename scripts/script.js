/*
Countdown timer
*/
document.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM Content fully loaded.");

  function startCountdown(containerSelector, countDownDate) {
    console.log(`Starting countdown for ${containerSelector}.`);

    const getElements = (selector) =>
      document.querySelector(containerSelector + " " + selector);

    const timer = setInterval(function () {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      const daysEl = getElements(".days");
      const hoursEl = getElements(".hours");
      const minutesEl = getElements(".minutes");
      const secondsEl = getElements(".seconds");

      if (daysEl && hoursEl && minutesEl && secondsEl) {
        daysEl.textContent = days.toString().padStart(2, "0");
        hoursEl.textContent = hours.toString().padStart(2, "0");
        minutesEl.textContent = minutes.toString().padStart(2, "0");
        secondsEl.textContent = seconds.toString().padStart(2, "0");

        console.log(
          `Update: ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`
        );

        if (distance < 0) {
          clearInterval(timer);
          daysEl.textContent = "00";
          hoursEl.textContent = "00";
          minutesEl.textContent = "00";
          secondsEl.textContent = "00";
          console.log("Countdown has ended.");
        }
      } else {
        console.log("One or more countdown elements not found.");
      }
    }, 1000);
  }

  const countDownDate = new Date("nov 16, 2024 00:00:00").getTime();

  startCountdown(".countdown__timer--first", countDownDate);
  startCountdown(".countdown__timer--second", countDownDate);
  startCountdown(".countdown__timer--third", countDownDate);
});

/*
FAQ's drop-down
*/
(() => {
  const toggleDropdown = (button) => {
    button.classList.toggle("active");
    const content = button.nextElementSibling;
    content.classList.toggle("active");
    content.style.maxHeight = content.classList.contains("active")
      ? `${content.scrollHeight}px`
      : null;
  };

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".dropdown-btn").forEach((button) => {
      button.addEventListener("click", () => toggleDropdown(button));
    });
  });
})();

/*
CTA slide to sign up function
*/
document.addEventListener("DOMContentLoaded", () => {
  const anchorLinks = document.querySelectorAll('a[href^="#"], a[href^="/#"]');

  const smoothScrollTo = (element, offset = 0, duration = 1000) => {
    const targetPosition =
      element.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition - offset;
    let startTime = null;

    const easeInOutCubic = (t, b, c, d) => {
      t /= d / 2;
      return t < 1
        ? (c / 2) * t * t * t + b
        : (c / 2) * ((t -= 2) * t * t + 2) + b;
    };

    const animation = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const nextStep = easeInOutCubic(
        timeElapsed,
        startPosition,
        distance,
        duration
      );

      window.scrollTo(0, nextStep);

      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    requestAnimationFrame(animation);
  };

  anchorLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const targetId = link.getAttribute("href").replace("/", "");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offset = targetId === "#features-section" ? 100 : 0;
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

/*
Banner arrow scroll
*/
document.addEventListener("DOMContentLoaded", function () {
  const scrollDownButton = document.querySelector("scroll-down-arrow");

  if (scrollDownButton) {
    scrollDownButton.addEventListener("click", function () {
      const aboutSection = document.getElementById("about-section");
      smoothScrollTo(aboutSection, 1000);
    });
  } else {
    console.log("Element with ID 'scroll-down-arrow' not found.");
  }

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

/*
Hamburger and help menu's working together
*/
const hamburgerMenu = document.querySelector(".hamburger-menu");
const mobileNav = document.querySelector(".mobile-nav");
const mobileNavLinks = document.querySelectorAll(
  ".mobile-nav-links a, .nav-logo"
);
const helpMenu = document.querySelector(".help-menu");
const sidebar = document.querySelector(".sidebar-mobile");
const body = document.body;

let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;

// Toggle mobile nav
hamburgerMenu.addEventListener("click", () => {
  mobileNav.classList.toggle("show");
  body.classList.toggle("no-scroll", mobileNav.classList.contains("show"));

  if (mobileNav.classList.contains("show")) {
    sidebar.classList.remove("show");
  }
});

// Close mobile nav when a link is clicked
mobileNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("show");
    body.classList.remove("no-scroll");
  });
});

// Toggle sidebar
helpMenu.addEventListener("click", function () {
  sidebar.classList.toggle("show");
  body.classList.toggle("no-scroll", sidebar.classList.contains("show"));

  if (sidebar.classList.contains("show")) {
    mobileNav.classList.remove("show");
  }
});

// Add touch event listeners to handle swipe gestures
sidebar.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].clientX;
});

sidebar.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].clientX;
  handleSidebarSwipe();
});

mobileNav.addEventListener("touchstart", (e) => {
  touchStartY = e.changedTouches[0].clientY;
});

mobileNav.addEventListener("touchend", (e) => {
  touchEndY = e.changedTouches[0].clientY;
  handleMobileNavSwipe();
});

function handleSidebarSwipe() {
  if (touchEndX < touchStartX - 30) {
    // Swipe left detected
    sidebar.classList.remove("show");
    body.classList.remove("no-scroll");
  }
}

function handleMobileNavSwipe() {
  if (touchEndY < touchStartY - 30) {
    // Swipe up detected
    mobileNav.classList.remove("show");
    body.classList.remove("no-scroll");
  }
}

// Toggle dropdown menu
// document.addEventListener("DOMContentLoaded", function () {
//   const dropdownToggle = document.querySelector(".dropdown-toggle");
//   const dropdownMenu = document.querySelector(".dropdown-menu");

//   dropdownToggle.addEventListener("click", function (event) {
//     event.preventDefault(); // Prevent default link behaviour
//     dropdownMenu.classList.toggle("show");
//   });
// });


/*
Sign up code
*/
const signUpForm2 = document.getElementById("signUpForm2");
const emailInput = document.getElementById("emailInput");
const firstnameInput = document.getElementById("firstnameInput");
const lastnameInput = document.getElementById("lastnameInput");

signUpForm2.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = emailInput.value;
  const firstname = firstnameInput.value;
  const lastname = lastnameInput.value;

  try {
    const response = await fetch("/scripts/subscribe.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `email=${encodeURIComponent(email)}&firstname=${encodeURIComponent(
        firstname
      )}&lastname=${encodeURIComponent(lastname)}`,
    });

    if (response.ok) {
      const result = await response.json();
      if (result.success) {
        console.log("Email subscribed successfully.");
        // Show the success popup
        document.getElementById("popup-container").style.display = "block";
        emailInput.value = ""; // Reset the input fields
        firstnameInput.value = "";
        lastnameInput.value = "";
      } else {
        console.error("Error subscribing email:", result.message);
        // Show the "already exist" popup
        document.getElementById(
          "popup-container-already-exists"
        ).style.display = "block";
      }
    } else {
      console.error("Error subscribing email:", response.statusText);
      // Show the "issue" popup
      document.getElementById("popup-container-issue").style.display = "block";
    }
  } catch (error) {
    console.error("Error subscribing email:", error);
    // Show the "issue" popup
    document.getElementById("popup-container-issue").style.display = "block";
  }
});

/*
Popup Close Button
*/
// Get all elements with the class "close-popup"
var closeButtons = document.querySelectorAll(".close-popup");

// Loop through each close button element
closeButtons.forEach(function (closeButton) {
  // Add click event listener to the close button
  closeButton.addEventListener("click", function () {
    // Hide the parent popup container
    this.closest(".popup-container").style.display = "none";
  });
});


