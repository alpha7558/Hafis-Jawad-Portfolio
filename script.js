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



/* POINTER PARALLAX TILT FOR HERO PORTRAIT
   Applies a smooth pointer-driven 3D tilt to the portrait and
   a smaller linked transform to the title container. Respects
   prefers-reduced-motion.
============================================================ */

if (!prefersReducedMotion) {
    (function(){
        const hero = document.querySelector('.hero');
        const portrait = document.querySelector('.hero-portrait');
        const title = document.querySelector('.hero-title-container');
        if (!hero || !portrait || !title) return;

        let rx = 0, ry = 0, tx = 0, ty = 0;
        let targetRx = 0, targetRy = 0, targetTx = 0, targetTy = 0;
        const ease = 0.12;
        const maxRotate = 8; // degrees
        const maxTranslate = 12; // px

        function onMove(e){
            const rect = hero.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const px = (x / rect.width) - 0.5; // -0.5..0.5
            const py = (y / rect.height) - 0.5;

            targetRy = -px * maxRotate; // rotateY opposite to cursor X
            targetRx = py * maxRotate;  // rotateX follows cursor Y
            targetTx = -px * maxTranslate;
            targetTy = -py * maxTranslate;
        }

        function onEnter(){ hero.addEventListener('mousemove', onMove); }
        function onLeave(){
            hero.removeEventListener('mousemove', onMove);
            targetRx = targetRy = targetTx = targetTy = 0;
        }

        function raf(){
            rx += (targetRx - rx) * ease;
            ry += (targetRy - ry) * ease;
            tx += (targetTx - tx) * ease;
            ty += (targetTy - ty) * ease;

            portrait.style.transform = `rotateY(${ry}deg) rotateX(${rx}deg) translateZ(12px) translate(${tx}px, ${ty}px)`;
            title.style.transform = `translateZ(6px) rotateY(${ry*0.35}deg) rotateX(${rx*0.35}deg) translate(${tx*0.25}px, ${ty*0.25}px)`;

            requestAnimationFrame(raf);
        }

        hero.addEventListener('mouseenter', onEnter);
        hero.addEventListener('mouseleave', onLeave);
        raf();
    })();
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
   AUTO-SWAP PORTRAIT CHECKER
   Periodically tries to load assets/portrait.png and when found
   replaces the placeholder with an <img>. Stops after success.
============================================================ */
(function(){
    const PLACEHOLDER_SEL = '.hero-portrait__placeholder';
    const PORTRAIT_PATH = 'assets/portrait.png';
    const MAX_TRIES = 12; // ~24s if interval 2s
    const INTERVAL_MS = 2000;
    let tries = 0;
    function tryLoad(){
        const placeholder = document.querySelector(PLACEHOLDER_SEL);
        if (!placeholder) return; // nothing to do
        const img = new Image();
        img.src = PORTRAIT_PATH + '?t=' + Date.now(); // cache-bust
        img.onload = function(){
            const portraitWrap = placeholder.closest('.hero-portrait');
            if (!portraitWrap) return;
            const imgEl = document.createElement('img');
            imgEl.src = PORTRAIT_PATH;
            imgEl.alt = 'Portrait';
            imgEl.style.width = '100%';
            imgEl.style.height = '100%';
            placeholder.replaceWith(imgEl);
            // stop polling
            clearInterval(poll);
        };
        img.onerror = function(){
            tries++;
            if (tries >= MAX_TRIES) clearInterval(poll);
        };
    }
    const poll = setInterval(tryLoad, INTERVAL_MS);
    // also try immediately once
    tryLoad();
})();

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


        // duplicate track content once so we can loop seamlessly
        const originalHTML = testimonialTrack.innerHTML;
        const originalWidth = testimonialTrack.scrollWidth;
        testimonialTrack.innerHTML += originalHTML;
        const loopWidth = originalWidth;

        const totalWidth = Math.max(loopWidth - window.innerWidth, 0);

        const targetX = Math.max(totalWidth * .55, 0);

        const proxy = { x: 0 };
        const testimonialTween = gsap.to(proxy, {
            x: targetX,
            ease: 'none',
            scrollTrigger: {
                trigger: '.testimonials',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2
            },
            onUpdate: () => {
                const val = ((proxy.x % loopWidth) + loopWidth) % loopWidth;
                gsap.set(testimonialTrack, { x: -val });
            }
        });

        // Pointer skim: when the pointer is over the testimonials section,
        // disable the scroll-driven tween and allow pointer to control continuous scrolling.
        const testimonialsSection = document.querySelector('.testimonials');
        if (testimonialsSection) {
            const st = testimonialTween.scrollTrigger;
            let isPointerActive = false;
            let pointerPct = 0.5; // 0..1 where 0 is left, 1 is right
            let currentX = 0; // 0..targetX in px
            // asymmetric dead zones: keep a larger dead zone on the right as requested
            const deadZoneLeft = 0.12;
            const deadZoneRight = 0.30; // increased right-side dead zone
            const maxSpeed = Math.max(targetX, 800) / 1.2; // px per second max when at edge

            function onPointerMove(e){
                const rect = testimonialsSection.getBoundingClientRect();
                let pct = (e.clientX - rect.left) / rect.width;
                pointerPct = Math.max(0, Math.min(1, pct));
            }

            testimonialsSection.addEventListener('mouseenter', () => {
                if (st && st.disable) st.disable();
                isPointerActive = true;
            });
            testimonialsSection.addEventListener('mousemove', onPointerMove);
            testimonialsSection.addEventListener('mouseleave', () => {
                if (st && st.enable) st.enable();
                isPointerActive = false;
            });

            // rAF loop for continuous scrolling when pointer is near edges
            let last = performance.now();
            function loop(now){
                const dt = (now - last) / 1000; last = now;
                if (isPointerActive) {
                    // compute normalized distance from center (0..1)
                    const dist = (pointerPct - 0.5) * 2; // -1..1
                    let velocity = 0;
                    if (dist < -deadZoneLeft * 2) {
                        // left side
                        const mag = Math.min(1, (Math.abs(dist) - deadZoneLeft*2) / (1 - deadZoneLeft*2));
                        velocity = -mag * maxSpeed;
                    } else if (dist > deadZoneRight * 2) {
                        // right side (larger dead zone)
                        const mag = Math.min(1, (Math.abs(dist) - deadZoneRight*2) / (1 - deadZoneRight*2));
                        velocity = mag * maxSpeed;
                    } else {
                        // within dead zone: small gentle easing toward a pinned position based on pointer
                        const pinnedX = targetX * pointerPct;
                        currentX += (pinnedX - currentX) * Math.min(1, 6 * dt);
                        const valPinned = ((currentX % loopWidth) + loopWidth) % loopWidth;
                        gsap.set(testimonialTrack, { x: -valPinned });
                        requestAnimationFrame(loop); return;
                    }

                    currentX += velocity * dt;
                    // allow wrapping by not clamping to targetX; apply modulus for seamless loop
                    const valMove = ((currentX % loopWidth) + loopWidth) % loopWidth;
                    gsap.set(testimonialTrack, { x: -valMove });
                }
                requestAnimationFrame(loop);
            }
            requestAnimationFrame(loop);
        }

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
   SOCIAL LOGOS INTERACTION
   Hover and pointer-proximity animation for the three social logos============================================================ */

(function(){
    const container = document.querySelector('.social-logos');
    if (!container) return;
    const logos = Array.from(container.querySelectorAll('.social-logo'));
    if (!logos.length) return;
    let rafId = null;
    let pointer = { x: 0, y: 0, active: false };

    function onMove(e){
        const rect = container.getBoundingClientRect();
        pointer.x = e.clientX - rect.left;
        pointer.y = e.clientY - rect.top;
    }
    function onEnter(e){ container.addEventListener('mousemove', onMove); pointer.active = true; }
    function onLeave(e){ container.removeEventListener('mousemove', onMove); pointer.active = false; reset(); }

    function reset(){
        logos.forEach((el) => gsap.to(el, { x: 0, y: 0, rotationX: 0, rotationY: 0, scale: 1, duration: 0.45, ease: 'power3.out' }));
    }

    function loop(){
        if (pointer.active) {
            const rect = container.getBoundingClientRect();
            logos.forEach((el) => {
                const logoRect = el.getBoundingClientRect();
                const cx = logoRect.left + logoRect.width/2 - rect.left;
                const cy = logoRect.top + logoRect.height/2 - rect.top;
                const dx = (pointer.x - cx) / rect.width; // -1..1-ish
                const dy = (pointer.y - cy) / rect.height;
                const dist = Math.sqrt(dx*dx + dy*dy);
                const intensity = Math.max(0, 1 - dist*2); // closer => larger
                const tx = dx * 12 * intensity; // translate
                const ty = dy * 10 * intensity;
                const rY = dx * 6 * intensity; // rotateY
                const rX = -dy * 6 * intensity;
                const scale = 1 + 0.06 * intensity;
                gsap.to(el, { x: tx, y: ty, rotationX: rX, rotationY: rY, scale: scale, duration: 0.35, ease: 'power3.out' });
            });
        }
        rafId = requestAnimationFrame(loop);
    }

    container.addEventListener('mouseenter', onEnter);
    container.addEventListener('mouseleave', onLeave);
    requestAnimationFrame(loop);
})();

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
