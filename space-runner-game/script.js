/* document = the entire webpage
getElementById("player") = find the element named player
const player = getElementById("player"); = store it in a variable called player
So now JavaScript has a handle to the player object.*/
const player = document.getElementById("player");

console.log(player);

/* Player physics 
What this means
playerY → vertical position of the player
velocityY → how fast the player is moving up or down
gravity → how strongly the player is pulled downward

These are the core physics variables for jumping.
Almost every platform game uses this idea.*/
let playerY = 0;
let velocityY = 0;
const gravity = -1;

/*What this does

velocityY += gravity; → gravity keeps pulling the player downward
playerY += velocityY; → the player’s vertical position changes based on that speed
console.log("playerY:", playerY); → lets us watch the value change

Right now we are updating the data only, not the visible square yet.
That’s important: programmers often get the logic working first, 
then connect it to visuals.
*/
function updatePlayer() {
  velocityY += gravity;
  playerY += velocityY;
/*This is a simple collision check to prevent the player from 
falling below the ground level (y=0).*/
  if (playerY < 0) {
    playerY = 0;
    velocityY = 0;
  }
/*Now we need to connect the data to the visual representation of the player.*/
  player.style.bottom = playerY + "px";

 /* console.log("playerY:", playerY); */
}

function jump() {
  if (playerY === 0) {
    velocityY = 12;
  }
}

/*What this does

document.addEventListener(...)
= listen for something happening on the page

"keydown"
= specifically listen for a keyboard press

if (event.code === "Space")
= only respond if the pressed key is the spacebar

jump();
= run the jump function */
document.addEventListener("keydown", function(event) {
  if (event.code === "Space") {
    jump();
  }
});

/* What this does
gameLoop runs
↓
updatePlayer runs
↓
browser schedules next frame
↓
gameLoop runs again

This repeats about 60 times per second.
That is the standard architecture used in most browser games.*/
function gameLoop() {
  updatePlayer();
  requestAnimationFrame(gameLoop);
}

gameLoop();

function showScreen(screenId) {
  // 1. Hide all 4 screens
    const screens = document.querySelectorAll(".screen");    
  // 2. Show only the one matching screenId
    screens.forEach(screen => {
      if (screen.id === screenId) {
        screen.style.display = "block";
      } else {
        screen.style.display = "none";
      }
    });
}