const hero = document.querySelector(".hero");
if (!hero) {
  throw new Error("No .hero element found on the page.");
}

const canvas = document.createElement("canvas");
canvas.id = "pulsingBackground";
canvas.style.position = "absolute";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.style.zIndex = "-1";
hero.style.position = "relative";
hero.appendChild(canvas);

const ctx = canvas.getContext("2d");

function resizeCanvas() {
  const rect = hero.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

let time = 0;
const speed = 0.006;

function draw() {
  const width = canvas.width;
  const height = canvas.height;

  ctx.clearRect(0, 0, width, height);

  const gradient = ctx.createRadialGradient(
    width / 2,
    height / 2,
    Math.sin(time) * 200 + 300,
    width / 2,
    height / 2,
    Math.cos(time) * 300 + 500
  );

  // Dark Grey
  gradient.addColorStop(0, "rgb(50, 50, 50)");

  // Black
  gradient.addColorStop(1, "rgba(30, 28, 31, 1)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  time += speed;

  requestAnimationFrame(draw);
}

draw();
