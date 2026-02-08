const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

function firstPageAnim() {
  var tl = gsap.timeline();

  tl.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1.5,
    ease: "expo.inOut",
  })

    .to(".boundingelem", {
      y: "0",
      duration: 2,
      ease: "expo.inOut",
      delay: -1,
      stagger: 0.2,
    })

    .from("#herofooter", {
      y: "-10",
      opacity: 0,
      duration: 1.5,
      delay: -1,
      ease: "expo.inOut",
    });
}

var timeout;
function circlemouseanim() {
  var xscale = 1;
  var yscale = 1;
  var xprev = 0;
  var yprev = 0;
  window.addEventListener("mousemove", function (dets) {
    clearTimeout(timeout);

    xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
    yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);

    xprev = dets.clientX;
    yprev = dets.clientY;

    circlemousefollower(xscale, yscale);

    timeout = setTimeout(function () {
      document.querySelector("#minicircle").style.transform =
        `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`; // Reset to original size after a short delay
    }, 100);
  });
}

function circlemousefollower(xscale, yscale) {
  window.addEventListener("mousemove", function (dets) {
    document.querySelector("#minicircle").style.transform =
      `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`; // Apply both translation and scaling
  });
}

firstPageAnim();
circlemousefollower();
circlemouseanim();

document.querySelectorAll(".elem").forEach(function (elem) {
  var rotate = 0;
  var diffrot = 0;

  elem.addEventListener("mouseleave", function (details) {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: "power3.out",
      duration: 0.5,
    });
  });

  elem.addEventListener("mousemove", function (details) {
    var rect = elem.getBoundingClientRect();
    var diff = details.clientY - rect.top;
    var diffLeft = details.clientX - rect.left;
    diffrot = details.clientX - rotate;
    rotate = details.clientX;

    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: "power3.out",
      x: diffLeft,
      y: diff,
      xPercent: -50,
      yPercent: -50,
      rotate: gsap.utils.clamp(-15, 15, diffrot * 0.5),
    });
  });
});
