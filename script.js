/* ============================================================
   GSAP
============================================================ */

gsap.registerPlugin(ScrollTrigger);


/* ============================================================
   PAGE LOAD
============================================================ */

window.addEventListener("load", () => {

  const heroWords =
    document.querySelectorAll(".hero-title span");


  gsap.to(heroWords, {

    y: "0%",

    duration: 1.5,

    stagger: .12,

    ease: "power4.out"

  });


  gsap.from(".hero-description", {

    opacity: 0,

    y: 40,

    duration: 1,

    delay: .4,

    ease: "power3.out"

  });


  gsap.from(".hero-bottom", {

    opacity: 0,

    y: 30,

    duration: 1,

    delay: .7,

    ease: "power3.out"

  });

});


/* ============================================================
   SCROLL REVEALS
============================================================ */

document
  .querySelectorAll(".reveal")
  .forEach(element => {

    gsap.to(element, {

      opacity: 1,

      y: 0,

      duration: 1.2,

      ease: "power3.out",

      scrollTrigger: {

        trigger: element,

        start: "top 85%",

        once: true

      }

    });

  });


/* ============================================================
   PARALLAX HEADINGS
============================================================ */

document
  .querySelectorAll(".huge-heading")
  .forEach(element => {

    gsap.to(element, {

      y: -50,

      ease: "none",

      scrollTrigger: {

        trigger: element,

        start: "top bottom",

        end: "bottom top",

        scrub: 1

      }

    });

  });


/* ============================================================
   PROJECT IMAGE PARALLAX
============================================================ */

document
  .querySelectorAll(".project-image img")
  .forEach(image => {

    gsap.to(image, {

      yPercent: -7,

      ease: "none",

      scrollTrigger: {

        trigger: image,

        start: "top bottom",

        end: "bottom top",

        scrub: 1

      }

    });

  });


/* ============================================================
   JOURNEY IMAGE MOVEMENT
============================================================ */

document
  .querySelectorAll(".timeline-image img")
  .forEach(image => {

    gsap.to(image, {

      yPercent: -10,

      ease: "none",

      scrollTrigger: {

        trigger: image,

        start: "top bottom",

        end: "bottom top",

        scrub: 1

      }

    });

  });


/* ============================================================
   PROJECT HOVER
============================================================ */

document
  .querySelectorAll(".project-card")
  .forEach(project => {

    const image =
      project.querySelector("img");


    project.addEventListener(
      "mouseenter",
      () => {

        gsap.to(image, {

          scale: 1,

          duration: 1.1,

          ease: "power3.out"

        });

      }
    );


    project.addEventListener(
      "mouseleave",
      () => {

        gsap.to(image, {

          scale: 1.08,

          duration: 1.1,

          ease: "power3.out"

        });

      }
    );

  });


/* ============================================================
   MAGNETIC ELEMENTS
============================================================ */

document
  .querySelectorAll(".magnetic")
  .forEach(element => {


    element.addEventListener(
      "mousemove",
      event => {

        const rect =
          element.getBoundingClientRect();


        const x =
          event.clientX -
          rect.left -
          rect.width / 2;


        const y =
          event.clientY -
          rect.top -
          rect.height / 2;


        gsap.to(element, {

          x: x * .15,

          y: y * .15,

          duration: .5,

          ease: "power3.out"

        });

      }
    );


    element.addEventListener(
      "mouseleave",
      () => {

        gsap.to(element, {

          x: 0,

          y: 0,

          duration: .7,

          ease: "elastic.out(1,.4)"

        });

      }
    );

  });


/* ============================================================
   CUSTOM CURSOR
============================================================ */

const cursor =
  document.querySelector(".cursor");

const cursorText =
  document.querySelector(".cursor-text");


let mouseX = 0;
let mouseY = 0;

let cursorX = 0;
let cursorY = 0;


window.addEventListener(
  "mousemove",
  event => {

    mouseX =
      event.clientX;

    mouseY =
      event.clientY;

  }
);


function cursorAnimation() {

  cursorX +=
    (mouseX - cursorX) * .13;

  cursorY +=
    (mouseY - cursorY) * .13;


  cursor.style.left =
    cursorX + "px";

  cursor.style.top =
    cursorY + "px";


  requestAnimationFrame(
    cursorAnimation
  );

}

cursorAnimation();


/* ============================================================
   CURSOR STATES
============================================================ */

const cursorTargets =
  document.querySelectorAll(
    "a, button, .project-card"
  );


cursorTargets.forEach(element => {


  element.addEventListener(
    "mouseenter",
    () => {

      cursor.classList.add(
        "active"
      );


      const label =
        element.dataset.cursor;


      if (label) {

        cursorText.textContent =
          label;

      }

    }
  );


  element.addEventListener(
    "mouseleave",
    () => {

      cursor.classList.remove(
        "active"
      );

    }
  );

});


/* ============================================================
   CURSOR CLICK EFFECT
============================================================ */

window.addEventListener(
  "mousedown",
  () => {

    gsap.to(cursor, {

      scale: .65,

      duration: .15

    });

  }
);


window.addEventListener(
  "mouseup",
  () => {

    gsap.to(cursor, {

      scale: 1,

      duration: .5,

      ease: "elastic.out(1,.5)"

    });

  }
);


/* ============================================================
   FAQ
============================================================ */

document
  .querySelectorAll(".faq-question")
  .forEach(button => {


    button.addEventListener(
      "click",
      () => {

        const item =
          button.closest(".faq-item");


        const currentlyOpen =
          item.classList.contains("open");


        document
          .querySelectorAll(".faq-item")
          .forEach(other => {

            other.classList.remove(
              "open"
            );

          });


        if (!currentlyOpen) {

          item.classList.add(
            "open"
          );

        }

      }
    );

  });


/* ============================================================
   DARK SECTION NAVIGATION COLOR
============================================================ */

ScrollTrigger.create({

  trigger: ".capabilities",

  start: "top 5%",

  end: "bottom 5%",


  onEnter: () => {

    document.querySelector(".nav")
      .style.color = "#ffffff";

  },


  onLeave: () => {

    document.querySelector(".nav")
      .style.color = "";

  },


  onEnterBack: () => {

    document.querySelector(".nav")
      .style.color = "#ffffff";

  },


  onLeaveBack: () => {

    document.querySelector(".nav")
      .style.color = "";

  }

});


/* ============================================================
   SMOOTH SECTION IMAGE SCALE
============================================================ */

document
  .querySelectorAll(".about-image img")
  .forEach(image => {

    gsap.fromTo(

      image,

      {
        scale: 1.15
      },

      {
        scale: 1,

        ease: "none",

        scrollTrigger: {

          trigger: image,

          start: "top 90%",

          end: "bottom 20%",

          scrub: 1

        }

      }

    );

  });


/* ============================================================
   REDUCED MOTION
============================================================ */

if (
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches
) {

  ScrollTrigger.getAll()
    .forEach(trigger => {
      trigger.disable();
    });

}