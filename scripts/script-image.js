/*
image blurr on scroll
*/
const bannerSection = document.getElementById("banner-section");

/*
Counterclockwise twist effect function 
*/
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

    console.log("Current Scroll Position:", currentScrollPosition);
    console.log("Banner Top:", bannerTop);
    console.log("Banner Height:", bannerHeight);
    console.log("Banner Bottom:", bannerBottom);

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

      console.log("Relative Scroll Position:", relativeScrollPosition);
      console.log("Blur Value:", blurValue);
      console.log("Opacity Value:", opacityValue);
      console.log("Scale Value:", scaleValue);
      console.log("Twist Value:", twistValue);

      image.style.filter = `blur(${blurValue}px)`;
      image.style.opacity = opacityValue;
      image.style.transform = `scale(${scaleValue}) rotate(${twistValue}deg)`;
    } else if (currentScrollPosition < bannerTop) {
      image.style.filter = "blur(0px)";
      image.style.opacity = 1;
      image.style.transform = "scale(1) rotate(0deg)";
      console.log("Scroll Position is above the banner section.");
    } else if (currentScrollPosition > bannerBottom) {
      image.style.filter = `blur(${blurMax}px)`;
      image.style.opacity = 0;
      image.style.transform = `scale(${2}) rotate(${-twistMax}deg)`;
      console.log("Scroll Position is below the banner section.");
    }
  });
}

/*
Clockwise twist effect function
*/
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

/*
No twist effect function
*/

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
