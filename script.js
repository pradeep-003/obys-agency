function locomotiveScrollTriggerCodePan() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

function loadingAnimation() {
  var tl = gsap.timeline();
  tl.from(".line h1, .line h2", {
    y: 150,
    stagger: 0.25,
    duration: 0.6,
    delay: 0.5,
  });

  tl.from("#loader-bottom h5", {
    y: 150,
    duration: 0.6,
    delay: 0.5,
  });

  tl.from("#line1-part1", {
    opacity: 0,
    onStart: function () {
      var i = 18;
      var stopper = setInterval(() => {
        document.querySelector("#line1-part1 h5").innerText = i++;
        if (i == 101) {
          clearInterval(stopper);
        }
      }, 25);
    },
  });

  tl.to("#loader", {
    opacity: 0,
    duration: 0.2,
    delay: 2,
  });

  tl.from("#page1", {
    y: 1600,
    opacity: 0,
    delay: 0.2,
    ease: "power4",
    duration: 0.8,
  });

  tl.set("#loader", {
    display: "none",
  });
  tl.from("#nav", {
    opacity: 0,
  });

  tl.from(".hero h1, .hero h2, .hero h3", {
    y: 120,
    stagger: 0.25,
  });
  tl.from(
    "#hero1, #page2",
    {
      opacity: 0,
    },
    "-=1.2"
  );
}

function cursorAnimation() {
  document.addEventListener("mousemove", (dets) => {
    gsap.to("#cursor", {
      left: dets.x,
      top: dets.y,
    });
  });
  Shery.makeMagnet("#nav-part2 h4");

  var videoContainer = document.querySelector("#video-container");

  var video = document.querySelector("#video-container video");

  videoContainer.addEventListener("mouseenter", () => {
    videoContainer.addEventListener("mousemove", (dets) => {
      gsap.to("#cursor", {
        opacity: 0,
      });
      gsap.to("#video-cursor", {
        left: dets.x - 420,
        y: dets.y - 80,
      });
    });
  });

  videoContainer.addEventListener("mouseleave", () => {
    gsap.to("#cursor", {
      opacity: 1,
    });
    gsap.to("#video-cursor", {
      left: "70%",
      top: "-45%",
    });
  });

  var flag = 0;
  videoContainer.addEventListener("click", () => {
    if (flag == 0) {
      video.play();
      video.style.opacity = 1;

      document.querySelector(
        "#video-cursor"
      ).innerHTML = `<i class="ri-pause-fill"></i>`;

      gsap.to("#video-cursor", {
        scale: 0.5,
      });

      flag = 1;
    } else {
      video.pause();
      video.style.opacity = 0;
      document.querySelector(
        "#video-cursor"
      ).innerHTML = `<i class="ri-play-fill"></i>`;

      gsap.to("#video-cursor", {
        scale: 1,
      });
      flag = 0;
    }
  });
}

function sheryAnimation() {
  Shery.imageEffect(".image-div", {
    style: 5,
    gooey: true,
    config: {
      a: { value: 2, range: [0, 30] },
      b: { value: 0.75, range: [-1, 1] },
      zindex: { value: -9996999, range: [-9999999, 9999999] },
      aspect: { value: 0.7241195453907675 },
      gooey: { value: true },
      infiniteGooey: { value: false },
      growSize: { value: 4, range: [1, 15] },
      durationOut: { value: 1, range: [0.1, 5] },
      durationIn: { value: 1.5, range: [0.1, 5] },
      displaceAmount: { value: 0.5 },
      masker: { value: true },
      maskVal: { value: 1.23, range: [1, 5] },
      scrollType: { value: 0 },
      geoVertex: { range: [1, 64], value: 1 },
      noEffectGooey: { value: true },
      onMouse: { value: 0 },
      noise_speed: { value: 0.5, range: [0, 10] },
      metaball: { value: 0.33, range: [0, 2] },
      discard_threshold: { value: 0.5, range: [0, 1] },
      antialias_threshold: { value: 0.01, range: [0, 0.1] },
      noise_height: { value: 0.5, range: [0, 2] },
      noise_scale: { value: 10, range: [0, 100] },
    },
  });
}

document.addEventListener("mousemove", (dets) => {
  gsap.to("#flag", {
    x: dets.x,
    y: dets.y,
  });
});

document.querySelector("#hero3").addEventListener("mouseenter", () => {
  gsap.to("#flag", {
    opacity: 1,
  });
});
document.querySelector("#hero3").addEventListener("mouseleave", () => {
  gsap.to("#flag", {
    opacity: 0,
  });
});

// Initialize Textillate
$("#footer h1").textillate({
  autoStart: false,
  in: { effect: "fadeInRight" },
  minDisplayTime: 100,
});

// Trigger it once when the page loads to show the text
$(document).ready(function () {
  $("#footer h1").textillate("start");
});

// On hover, play animation again
$("#footer h1").hover(function () {
  $(this).textillate("start");
});

cursorAnimation();
loadingAnimation();
locomotiveScrollTriggerCodePan();
sheryAnimation();
// Check console to see if it logs a LocomotiveScroll instance
