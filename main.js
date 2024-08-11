
const imagePaths = [
  "https://placehold.co/300x400/4a0000/FFF",
  "https://placehold.co/300x400/540b06/FFF",
  "https://placehold.co/300x400/5f160a/FFF",
  "https://placehold.co/300x400/69200e/FFF",
  "https://placehold.co/300x400/742910/FFF",
  "https://placehold.co/300x400/893d1e/FFF",
];
    document.addEventListener("DOMContentLoaded", function () {
      const container = document.querySelector(".items");
      let imageIndex = 0; 
      let animationTimeout = null;
      let currentlyAnimating = false;
      let lastAddedTime = 0;
      const throttleInterval = 75; 

      function addNewItem(x, y) {
        const newItem = document.createElement("div");
        newItem.className = "item";
        newItem.style.left = `${x - 75}px`;
        newItem.style.top = `${y - 75}px`;

        const img = document.createElement("img");
        img.src = imagePaths[imageIndex]; 
        newItem.appendChild(img);
        imageIndex = (imageIndex + 1) % imagePaths.length;

        container.appendChild(newItem);
        manageItemLimit();
      }

      function manageItemLimit() {
        while (container.children.length > 10) {
          container.removeChild(container.firstChild);
        }
      }

      function startAnimation() {
        if (currentlyAnimating || container.children.length === 0) return;
        currentlyAnimating = true;
        gsap.to(".item", {
          y: 2500,
          scale: 1.5,
          opacity: 0,
          duration: 1
          ,
          stagger: 1,
          onComplete: function () {
            this.targets().forEach((item) => {
              if (item.parentNode) {
                item.parentNode.removeChild(item);
              }
            });
            currentlyAnimating = false;
          },
        });
      }

      container.addEventListener("mousemove", function (event) {
        const now = Date.now();
        if (now - lastAddedTime > throttleInterval) {
            clearTimeout(animationTimeout);
            addNewItem(event.pageX, event.pageY);
            animationTimeout = setTimeout(startAnimation, 3000); 
            lastAddedTime = now;
        }
    });
    });
