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
  duration: 0.5,
});

tl.to("#loader", {
  display: "none",
});
