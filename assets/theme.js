const section = document.querySelector(".text-with-slides-wrapper__section");

let swiper = new Swiper(".list-category-blocks", {
  slidesPerView: 1,
  breakpoints: {
    1200: {
      direction: "vertical",
      autoHeight: true,
      loop: false,
      centeredSlides: true,
    },
  },
});

const categoriesButtons = document.querySelectorAll(
  ".tws-info__list-categories li"
);

categoriesButtons.forEach((button) =>
  button.addEventListener("click", (event) => {
    const index = +button.dataset.index;
    changeActiveCategory(index);
  })
);

swiper.on("slideChange", function () {
  changeActiveCategory(swiper.activeIndex);
});

function changeActiveCategory(index) {
  const categorriesArray = Array.from(categoriesButtons);
  const bgBlock = document.querySelector(".tws-list-section__bg");
  const activeButton = categorriesArray.find(
    (button) => +button.dataset.index === index
  );

  bgBlock.classList.remove(
    ...Array.from(bgBlock.classList.entries())
      .map(([, c]) => c)
      .filter((c) => c.startsWith("color-"))
  );

  categorriesArray.map((button) => button.classList.remove("active"));

  bgBlock.classList.add(activeButton.className);
  activeButton.classList.add("active");

  console.log();

  swiper.slideTo(index);
}

ScrollTrigger.matchMedia({
  "(min-width: 1200px)": function () {
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      let prev = 0;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "center center",
          pin: section,
          scrub: true,
          animation: false,
          onUpdate: (self) => {
            const active = Math.floor(categoriesButtons.length * self.progress);
            const header = categoriesButtons[active];

            if (
              typeof tl.scrollTrigger.scrollForceToIndex !== "undefined" &&
              tl.scrollTrigger.scrollForceToIndex !== active
            ) {
              return false;
            }

            if (prev !== active && header) {
              const index = header.dataset.index;

              swiper.slideTo(index);

              prev = active;
              tl.scrollTrigger.scrollForceToIndex = undefined;
            }
          },
        },
      });
    }
  },
});
