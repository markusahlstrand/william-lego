const gubbe = document.getElementById("gubbe");

let speed = 0;
let jumpSpeed = 0;
let isJumping = false;
let walkCounter = 0;

function goRight() {
  speed = 10;
  walkCounter = 3;
}

function goLeft() {
  speed = -10;
  walkCounter = 3;
}

function jump() {
  jumpSpeed = 30;
  isJumping = true;
}

document.addEventListener("keydown", (event) => {
  if (isJumping) {
    return;
  }

  let handled = true;

  switch (event.key) {
    case "ArrowLeft":
      goLeft();
      break;
    case "ArrowRight":
      goRight();
      break;
    case "ArrowUp":
    case " ":
      jump();
      break;
    default:
      handled = false;
      break;
  }

  if (handled) {
    event.preventDefault();
  }

  return false;
});

let gubbIndex = 0;
setInterval(() => {
  let positionX = parseInt(gubbe.style.right.replace("px", ""));
  let positionY = parseInt(gubbe.style.top.replace("px", ""));

  if (walkCounter === 0 && jumpSpeed === 0) {
    speed = 0;
  } else {
    walkCounter--;
  }

  if (speed === 0) {
    gubbIndex = 1;
  } else {
    gubbIndex++;
    gubbIndex = gubbIndex % 8;
  }

  if (speed < 0) {
    gubbe.style.transform = "scaleX(-1)";
  } else if (speed > 0) {
    gubbe.style.transform = "scaleX(1)";
  }

  if (positionY < 400) {
    gubbe.setAttribute("src", "/images/jump.png");
  } else if (speed === 0) {
    gubbe.setAttribute("src", "/images/standing.png");
  } else {
    gubbe.setAttribute("src", `/images/walk${Math.floor(gubbIndex / 2)}.png`);
  }

  positionY -= jumpSpeed;

  if (positionY > 400) {
    isJumping = false;
    jumpSpeed = 0;
    speed = 0;
    positionY = 400;
  } else if (positionY < 400) {
    jumpSpeed -= 5;
  }

  gubbe.style.top = "400px";
  gubbe.style.right = positionX - speed + "px";
  gubbe.style.top = positionY + "px";
}, 50);
