/* ============================================================
   NESH GLASS — JAVASCRIPT
============================================================ */

gsap.registerPlugin(ScrollTrigger);



/* ============================================================
   GLOBAL SETTINGS
============================================================ */

const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;



/* ============================================================
   CUSTOM CURSOR
============================================================ */

const cursor =
    document.querySelector(".cursor");

const cursorLabel =
    document.querySelector(".cursor-label");


let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let cursorX = mouseX;
let cursorY = mouseY;


if (!prefersReducedMotion && cursor) {

    window.addEventListener(
        "mousemove",
        (event) => {

            mouseX =
                event.clientX;

            mouseY =
                event.clientY;

        }
    );


    function animateCursor() {

        cursorX +=
            (mouseX - cursorX) * 0.14;

        cursorY +=
            (mouseY - cursorY) * 0.14;


        cursor.style.left =
            `${cursorX}px`;

        cursor.style.top =
            `${cursorY}px`;


        requestAnimationFrame(
            animateCursor
        );

    }


    animateCursor();

}



/* ============================================================
   CURSOR STATES
============================================================ */

const cursorTargets =
    document.querySelectorAll(
        "a, button, .project-card, .service-card"
    );


cursorTargets.forEach(
    (element) => {

        element.addEventListener(
            "mouseenter",
            () => {

                if (!cursor) return;

                cursor.classList.add(
                    "active"
                );


                const customLabel =
                    element.dataset.cursor;


                if (customLabel) {

                    cursorLabel.textContent =
                        customLabel;

                }

                else {

                    cursorLabel.textContent =
                        "VIEW";

                }

            }
        );


        element.addEventListener(
            "mouseleave",
            () => {

                if (!cursor) return;

                cursor.classList.remove(
                    "active"
                );

            }
        );

    }
);



/* ============================================================
   CLICK CURSOR
============================================================ */

window.addEventListener(
    "mousedown",
    () => {

        if (!cursor) return;

        gsap.to(
            cursor,
            {
                scale: .72,
                duration: .15
            }
        );

    }
);


window.addEventListener(
    "mouseup",
    () => {

        if (!cursor) return;

        gsap.to(
            cursor,
            {
                scale: 1,
                duration: .55,
                ease:
                    "elastic.out(1,.5)"
            }
        );

    }
);



/* ============================================================
   MAGNETIC ELEMENTS
============================================================ */

if (!prefersReducedMotion) {

    document
        .querySelectorAll(".magnetic")
        .forEach((element) => {


            element.addEventListener(
                "mousemove",
                (event) => {

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


                    gsap.to(
                        element,
                        {
                            x: x * .16,
                            y: y * .16,
                            duration: .45,
                            ease: "power3.out"
                        }
                    );

                }
            );


            element.addEventListener(
                "mouseleave",
                () => {

                    gsap.to(
                        element,
                        {
                            x: 0,
                            y: 0,
                            duration: .7,
                            ease:
                                "elastic.out(1,.4)"
                        }
                    );

                }
            );

        });

}



/* ============================================================
   HERO INTRO
============================================================ */

const heroTimeline =
    gsap.timeline();


heroTimeline

    .to(
        ".hero-title span",
        {
            y: "0%",
            duration: 1.35,
            stagger: .13,
            ease:
                "power4.out"
        }
    )

    .from(
        ".hero-kicker",
        {
            opacity: 0,
            y: 25,
            duration: .8,
            ease: "power3.out"
        },
        "-=.8"
    )

    .from(
        ".hero-intro",
        {
            opacity: 0,
            y: 30,
            duration: .8,
            ease: "power3.out"
        },
        "-=.6"
    )

    .from(
        ".stat",
        {
            opacity: 0,
            y: 25,
            stagger: .1,
            duration: .7,
            ease: "power3.out"
        },
        "-=.6"
    )

    .from(
        ".hero-bottom > *",
        {
            opacity: 0,
            y: 25,
            stagger: .1,
            duration: .7,
            ease: "power3.out"
        },
        "-=.4"
    );



/* ============================================================
   SCROLL REVEALS
============================================================ */

if (!prefersReducedMotion) {

    document
        .querySelectorAll(".reveal")
        .forEach((element) => {

            gsap.to(
                element,
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.15,
                    ease:
                        "power3.out",

                    scrollTrigger: {
                        trigger: element,
                        start:
                            "top 85%",
                        once: true
                    }
                }
            );

        });

}



/* ============================================================
   HERO PARALLAX
============================================================ */

if (!prefersReducedMotion) {

    gsap.to(
        ".hero-title",
        {
            yPercent: -15,
            ease: "none",

            scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "bottom top",
                scrub: 1
            }
        }
    );


    gsap.to(
        ".hero-orb",
        {
            yPercent: 80,
            rotation: 80,
            ease: "none",

            scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "bottom top",
                scrub: 1.5
            }
        }
    );

}



/* ============================================================
   ABOUT IMAGE PARALLAX
============================================================ */

if (!prefersReducedMotion) {

    gsap.to(
        ".about-image-wrap img",
        {
            yPercent: -10,
            scale: 1,
            ease: "none",

            scrollTrigger: {
                trigger:
                    ".about-image-wrap",
                start:
                    "top bottom",
                end:
                    "bottom top",
                scrub: 1
            }
        }
    );

}



/* ============================================================
   JOURNEY IMAGES
============================================================ */

if (!prefersReducedMotion) {

    document
        .querySelectorAll(
            ".journey-image img"
        )
        .forEach(
            (image) => {

                gsap.to(
                    image,
                    {
                        yPercent: -13,
                        ease: "none",

                        scrollTrigger: {
                            trigger:
                                image.closest(
                                    ".journey-item"
                                ),

                            start:
                                "top bottom",

                            end:
                                "bottom top",

                            scrub: 1
                        }
                    }
                );

            }
        );

}



/* ============================================================
   JOURNEY ITEM REVEALS
============================================================ */

if (!prefersReducedMotion) {

    document
        .querySelectorAll(
            ".journey-item"
        )
        .forEach(
            (item) => {

                gsap.from(
                    item.querySelector(
                        ".journey-content"
                    ),
                    {
                        x: 70,
                        opacity: 0,
                        duration: 1,
                        ease:
                            "power3.out",

                        scrollTrigger: {
                            trigger: item,
                            start:
                                "top 80%",
                            once: true
                        }
                    }
                );


                gsap.from(
                    item.querySelector(
                        ".journey-image"
                    ),
                    {
                        x: 80,
                        opacity: 0,
                        scale: .92,
                        duration: 1.2,
                        ease:
                            "power3.out",

                        scrollTrigger: {
                            trigger: item,
                            start:
                                "top 80%",
                            once: true
                        }
                    }
                );

            }
        );

}



/* ============================================================
   PROJECT IMAGE PARALLAX
============================================================ */

if (!prefersReducedMotion) {

    document
        .querySelectorAll(
            ".project-image img"
        )
        .forEach(
            (image) => {

                gsap.to(
                    image,
                    {
                        yPercent: -8,
                        ease: "none",

                        scrollTrigger: {
                            trigger:
                                image.closest(
                                    ".project-card"
                                ),

                            start:
                                "top bottom",

                            end:
                                "bottom top",

                            scrub: 1
                        }
                    }
                );

            }
        );

}



/* ============================================================
   PROJECT CARD ENTRANCE
============================================================ */

if (!prefersReducedMotion) {

    document
        .querySelectorAll(
            ".project-card"
        )
        .forEach(
            (card) => {

                gsap.from(
                    card,
                    {
                        opacity: 0,
                        y: 80,
                        duration: 1,
                        ease:
                            "power3.out",

                        scrollTrigger: {
                            trigger: card,
                            start:
                                "top 88%",
                            once: true
                        }
                    }
                );

            }
        );

}



/* ============================================================
   PROJECT HOVER IMAGE
============================================================ */

document
    .querySelectorAll(
        ".project-card"
    )
    .forEach(
        (card) => {

            const image =
                card.querySelector(
                    ".project-image img"
                );


            card.addEventListener(
                "mouseenter",
                () => {

                    if (!image) return;

                    gsap.to(
                        image,
                        {
                            scale: 1,
                            duration: 1.1,
                            ease:
                                "power3.out"
                        }
                    );

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    if (!image) return;

                    gsap.to(
                        image,
                        {
                            scale: 1.08,
                            duration: 1.1,
                            ease:
                                "power3.out"
                        }
                    );

                }
            );

        }
    );



/* ============================================================
   CAPABILITY REVEALS
============================================================ */

if (!prefersReducedMotion) {

    gsap.from(
        ".capability-item",
        {
            opacity: 0,
            y: 60,
            stagger: .12,
            duration: .9,
            ease:
                "power3.out",

            scrollTrigger: {
                trigger:
                    ".capability-list",
                start:
                    "top 80%",
                once: true
            }
        }
    );

}



/* ============================================================
   SERVICE CARDS
============================================================ */

if (!prefersReducedMotion) {

    gsap.from(
        ".service-card",
        {
            opacity: 0,
            y: 100,
            stagger: .15,
            duration: 1,
            ease:
                "power3.out",

            scrollTrigger: {
                trigger:
                    ".service-list",
                start:
                    "top 80%",
                once: true
            }
        }
    );

}



/* ============================================================
   TRANSFORMATION PARALLAX
============================================================ */

if (!prefersReducedMotion) {

    gsap.to(
        ".transformation-image img",
        {
            scale: 1,
            yPercent: -5,
            ease: "none",

            scrollTrigger: {
                trigger:
                    ".transformation",
                start:
                    "top bottom",
                end:
                    "bottom top",
                scrub: 1
            }
        }
    );

}



/* ============================================================
   TESTIMONIAL HORIZONTAL MOVEMENT
============================================================ */

if (!prefersReducedMotion) {

    const testimonialTrack =
        document.querySelector(
            ".testimonial-track"
        );


    if (testimonialTrack) {

        const cards =
            testimonialTrack.children;


        const totalWidth =
            testimonialTrack.scrollWidth -
            window.innerWidth;


        gsap.to(
            testimonialTrack,
            {
                x:
                    () =>
                        -Math.max(
                            totalWidth * .55,
                            0
                        ),

                ease: "none",

                scrollTrigger: {
                    trigger:
                        ".testimonials",

                    start:
                        "top bottom",

                    end:
                        "bottom top",

                    scrub: 1.2
                }
            }
        );

    }

}



/* ============================================================
   FAQ
============================================================ */

const faqItems =
    document.querySelectorAll(
        ".faq-item"
    );


faqItems.forEach(
    (item) => {

        const button =
            item.querySelector(
                ".faq-question"
            );


        button.addEventListener(
            "click",
            () => {

                const isOpen =
                    item.classList.contains(
                        "open"
                    );


                faqItems.forEach(
                    (other) => {

                        other.classList.remove(
                            "open"
                        );

                    }
                );


                if (!isOpen) {

                    item.classList.add(
                        "open"
                    );

                }

            }
        );

    }
);



/* ============================================================
   NAV COLOR / GLASS STATE
============================================================ */

const nav =
    document.querySelector(
        ".nav"
    );


ScrollTrigger.create({

    start: "top -80",

    onEnter: () => {

        nav.classList.add(
            "nav-scrolled"
        );

    },

    onLeaveBack: () => {

        nav.classList.remove(
            "nav-scrolled"
        );

    }

});



/* ============================================================
   AMBIENT MOUSE LIGHT
============================================================ */

if (
    !prefersReducedMotion &&
    window.innerWidth > 700
) {

    window.addEventListener(
        "mousemove",
        (event) => {

            const x =
                event.clientX /
                window.innerWidth *
                100;


            const y =
                event.clientY /
                window.innerHeight *
                100;


            gsap.to(
                ".ambient-one",
                {
                    x:
                        (x - 50) * .4,
                    y:
                        (y - 50) * .3,
                    duration: 2
                }
            );


            gsap.to(
                ".ambient-two",
                {
                    x:
                        (x - 50) * -.3,
                    y:
                        (y - 50) * -.2,
                    duration: 2.5
                }
            );

        }
    );

}



/* ============================================================
   SMOOTH SECTION TRANSITIONS
============================================================ */

if (!prefersReducedMotion) {

    document
        .querySelectorAll(
            ".section-meta"
        )
        .forEach(
            (meta) => {

                gsap.from(
                    meta,
                    {
                        opacity: 0,
                        x: -30,
                        duration: .8,
                        ease:
                            "power3.out",

                        scrollTrigger: {
                            trigger: meta,
                            start:
                                "top 90%",
                            once: true
                        }
                    }
                );

            }
        );

}



/* ============================================================
   ACTIVE NAVIGATION
============================================================ */

const sections =
    document.querySelectorAll(
        "section[id]"
    );


const navLinks =
    document.querySelectorAll(
        ".nav-links a"
    );


sections.forEach(
    (section) => {

        ScrollTrigger.create({

            trigger: section,

            start:
                "top center",

            end:
                "bottom center",

            onEnter: () => {

                const id =
                    section.id;


                navLinks.forEach(
                    (link) => {

                        link.style.color =
                            link.getAttribute(
                                "href"
                            ) === `#${id}`
                                ? "#d9ff45"
                                : "";

                    }
                );

            },

            onEnterBack: () => {

                const id =
                    section.id;


                navLinks.forEach(
                    (link) => {

                        link.style.color =
                            link.getAttribute(
                                "href"
                            ) === `#${id}`
                                ? "#d9ff45"
                                : "";

                    }
                );

            }

        });

    }
);



/* ============================================================
   IMAGE LOADING
============================================================ */

document
    .querySelectorAll("img")
    .forEach(
        (image) => {

            image.addEventListener(
                "load",
                () => {

                    image.classList.add(
                        "loaded"
                    );

                }
            );

        }
    );



/* ============================================================
   REFRESH SCROLLTRIGGER
============================================================ */

window.addEventListener(
    "load",
    () => {

        ScrollTrigger.refresh();

    }
);



/* ============================================================
   RESIZE
============================================================ */

let resizeTimer;


window.addEventListener(
    "resize",
    () => {

        clearTimeout(
            resizeTimer
        );


        resizeTimer =
            setTimeout(
                () => {

                    ScrollTrigger.refresh();

                },
                250
            );

    }
);
