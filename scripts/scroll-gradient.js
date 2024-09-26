document
  .querySelector(".chat-container")
  .addEventListener("scroll", function () {
    const chatContainer = document.querySelector(".chat-container");
    const chatBubbles = document.querySelectorAll(".chat-bubble");
    const containerHeight = chatContainer.clientHeight;

    chatBubbles.forEach((bubble) => {
      const bubbleRect = bubble.getBoundingClientRect();
      const containerRect = chatContainer.getBoundingClientRect();
      const bubbleTopRelativeToContainer = bubbleRect.top - containerRect.top;

      const scrollPercentage = bubbleTopRelativeToContainer / containerHeight;

      const startColor = [112, 11, 149]; // #700b95
      const endColor = [51, 11, 149]; // #330B95

      const newColor = startColor.map((start, i) => {
        return Math.round(start + (endColor[i] - start) * scrollPercentage);
      });

      bubble.style.backgroundColor = `rgb(${newColor.join(",")})`;
    });
  });
