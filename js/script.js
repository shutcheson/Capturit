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

  const countDownDate = new Date("jul 01, 2024 00:00:00").getTime();

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

  if (scrollDownButton) {
    scrollDownButton.addEventListener("click", function () {
      const aboutSection = document.getElementById("about-section");
      smoothScrollTo(aboutSection, 1000); // Adjust the duration as needed (in milliseconds)
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

// image blurr on scroll
const bannerSection = document.getElementById("banner-section");

// Function for counterclockwise twist effect (anti-clockwise)
function applyCounterclockwiseBlurTwistEffect(
  container,
  image,
  blurMax,
  twistMax
) {
  window.addEventListener("scroll", () => {
    const currentScrollPosition =
      window.pageYOffset || document.documentElement.scrollTop;
    const bannerTop = bannerSection.offsetTop;
    const bannerHeight = bannerSection.offsetHeight;
    const bannerBottom = bannerTop + bannerHeight;

    if (
      currentScrollPosition >= bannerTop &&
      currentScrollPosition <= bannerBottom
    ) {
      const relativeScrollPosition = currentScrollPosition - bannerTop;
      const blurValue = Math.min(
        blurMax,
        (relativeScrollPosition / bannerHeight) * blurMax
      );
      const opacityValue = Math.max(
        0,
        1 - relativeScrollPosition / bannerHeight
      );
      const scaleValue = 1 + relativeScrollPosition / bannerHeight;
      const twistValue = -(relativeScrollPosition / bannerHeight) * twistMax;

      image.style.filter = `blur(${blurValue}px)`;
      image.style.opacity = opacityValue;
      image.style.transform = `scale(${scaleValue}) rotate(${twistValue}deg)`;
    } else if (currentScrollPosition < bannerTop) {
      image.style.filter = "blur(0px)";
      image.style.opacity = 1;
      image.style.transform = "scale(1) rotate(0deg)";
    } else if (currentScrollPosition > bannerBottom) {
      image.style.filter = `blur(${blurMax}px)`;
      image.style.opacity = 0;
      image.style.transform = `scale(${2}) rotate(${-twistMax}deg)`;
    }
  });
}

// Function for clockwise twist effect
function applyClockwiseBlurTwistEffect(container, image, blurMax, twistMax) {
  window.addEventListener("scroll", () => {
    const currentScrollPosition =
      window.pageYOffset || document.documentElement.scrollTop;
    const bannerTop = bannerSection.offsetTop;
    const bannerHeight = bannerSection.offsetHeight;
    const bannerBottom = bannerTop + bannerHeight;

    if (
      currentScrollPosition >= bannerTop &&
      currentScrollPosition <= bannerBottom
    ) {
      const relativeScrollPosition = currentScrollPosition - bannerTop;
      const blurValue = Math.min(
        blurMax,
        (relativeScrollPosition / bannerHeight) * blurMax
      );
      const opacityValue = Math.max(
        0,
        1 - relativeScrollPosition / bannerHeight
      );
      const scaleValue = 1 + relativeScrollPosition / bannerHeight;
      const twistValue = (relativeScrollPosition / bannerHeight) * twistMax;

      image.style.filter = `blur(${blurValue}px)`;
      image.style.opacity = opacityValue;
      image.style.transform = `scale(${scaleValue}) rotate(${twistValue}deg)`;
    } else if (currentScrollPosition < bannerTop) {
      image.style.filter = "blur(0px)";
      image.style.opacity = 1;
      image.style.transform = "scale(1) rotate(0deg)";
    } else if (currentScrollPosition > bannerBottom) {
      image.style.filter = `blur(${blurMax}px)`;
      image.style.opacity = 0;
      image.style.transform = `scale(${2}) rotate(${twistMax}deg)`;
    }
  });
}

// Applying counterclockwise effect to portrait-wedding
const portraitWeddingContainer = document.getElementById("portrait-wedding");
const portraitWeddingImage = portraitWeddingContainer.querySelector("img");
applyCounterclockwiseBlurTwistEffect(
  portraitWeddingContainer,
  portraitWeddingImage,
  50,
  25
);

// Applying clockwise effect to landscape-trip
const landscapeTripContainer = document.getElementById("landscape-trip");
const landscapeTripImage = landscapeTripContainer.querySelector("img");
applyClockwiseBlurTwistEffect(
  landscapeTripContainer,
  landscapeTripImage,
  50,
  25
);

// Function for blur and scale effect without twist
function applyBlurScaleEffect(container, image, blurMax) {
  window.addEventListener("scroll", () => {
    const currentScrollPosition =
      window.pageYOffset || document.documentElement.scrollTop;
    const bannerTop = bannerSection.offsetTop;
    const bannerHeight = bannerSection.offsetHeight;
    const bannerBottom = bannerTop + bannerHeight;

    if (
      currentScrollPosition >= bannerTop &&
      currentScrollPosition <= bannerBottom
    ) {
      const relativeScrollPosition = currentScrollPosition - bannerTop;
      const blurValue = Math.min(
        blurMax,
        (relativeScrollPosition / bannerHeight) * blurMax
      );
      const opacityValue = Math.max(
        0,
        1 - relativeScrollPosition / bannerHeight
      );
      const scaleValue = 1 + relativeScrollPosition / bannerHeight;

      image.style.filter = `blur(${blurValue}px)`;
      image.style.opacity = opacityValue;
      image.style.transform = `scale(${scaleValue})`;
    } else if (currentScrollPosition < bannerTop) {
      image.style.filter = "blur(0px)";
      image.style.opacity = 1;
      image.style.transform = "scale(1)";
    } else if (currentScrollPosition > bannerBottom) {
      image.style.filter = `blur(${blurMax}px)`;
      image.style.opacity = 0;
      image.style.transform = `scale(${2})`;
    }
  });
}

// Applying blur and scale effect to portrait-party
const portraitPartyContainer = document.getElementById("portrait-party");
const portraitPartyImage = portraitPartyContainer.querySelector("img");
applyBlurScaleEffect(portraitPartyContainer, portraitPartyImage, 50);

// Applying blur and scale effect to landscape-festival
const landscapeFestivalContainer =
  document.getElementById("landscape-festival");
const landscapeFestivalImage = landscapeFestivalContainer.querySelector("img");
applyBlurScaleEffect(landscapeFestivalContainer, landscapeFestivalImage, 50);
