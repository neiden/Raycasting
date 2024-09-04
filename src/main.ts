import './style.css'

const canvas = document.getElementById('gameScreen') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!; 
const origin = [window.innerWidth/2 -200, window.innerHeight/2];
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let start: number | undefined;


const map = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

const FOV = 90;



var keymap = {
  16: 'shiftLeft',
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down'
};

let keys: Record<string, boolean> = {};
let pressed: Record<string, boolean> = {};
window.addEventListener("keydown", (ev) => {
  if (!keys[ev.code]) pressed[ev.code] = true;
  keys[ev.code] = true;
})
window.addEventListener("keyup", (ev) => {
  keys[ev.code] = false;
})

let tileSize = 64;

function renderMap(map: number[][], minimap: any): void {
  map.forEach((row, y) => {
    row.forEach((tile, x) => {
      if (tile === 1) {
        ctx.fillStyle = 'black';
        ctx.fillRect((x * (tileSize * minimap.scale)) + minimap.x, (y * (tileSize * minimap.scale) + minimap.y), (tileSize * minimap.scale), (tileSize * minimap.scale));
      }
    });
  });
}

function calculateMovement(currAngle: number){
  let currDegrees = currAngle * Math.PI / 180;
  let x = playerSpeed * Math.cos(currDegrees);
  let y = playerSpeed * Math.sin(currDegrees);
  return [x, y];
}

var playerSpeed = 5;
var playerX = 0;
var playerY = 0;
var playerVelocity = [0,0];
var currAngle = 0;
function movePlayer(): void {
  if (keys['KeyW']){
    let movement = calculateMovement(currAngle);
    playerVelocity[0] = movement[0];
    playerVelocity[1] = movement[1];
  }
  if (keys['KeyS']){
    let movement = calculateMovement(currAngle);
    playerVelocity[0] = -movement[0];
    playerVelocity[1] = -movement[1];
  }
  if (keys['KeyA']){
    currAngle -= 2
  }
  else if (keys['KeyD']){
    currAngle += 2
  }
  if (!keys['KeyW'] && !keys['KeyS']){
    playerVelocity[0] = 0;
    playerVelocity[1] = 0;
  }
}

function updatePlayer() {
    playerX += playerVelocity[0];
    playerY += playerVelocity[1];
}

/*
Given the player's current position and angle, shoot rays within some FOV range. 
*/
function shootRays(tileSize: number){
  let playerAngleRad = currAngle * Math.PI / 180;
  let startAngle = playerAngleRad - (Math.PI / 2) - (FOV * Math.PI / 180) / 2;
  for (let i = 0; i < FOV; i += .5){
    let rayAngle = startAngle + (i * Math.PI / 180);
    ctx.save()
    ctx.translate(playerX + tileSize / 2, playerY + tileSize / 2);
    ctx.rotate(rayAngle);

    ctx.fillStyle = 'green';
    ctx.fillRect(-10, -5, 1, 75);

    ctx.restore();
  }
}

function renderMinimap(){
  //Need to offset the minimap to sit in the corner of the screen
  //Need to change the size of everything and the position to be offset
  console.log("eep");
  let minimapWidth = 400;
  let minimapHeight = 400;
  let minimapX = window.innerWidth - minimapWidth - 50;
  let minimapY = 0;
  let scale = minimapWidth / (map[0].length * tileSize);
  let scaledTileSize = tileSize * scale;
  ctx.clearRect(minimapX, minimapY, minimapWidth, minimapHeight);

  renderMap(map, {'x': minimapX, 'y': minimapY, 'scale': scale});
  ctx.fillStyle = 'grey';
  ctx.fillRect(playerX, playerY, scaledTileSize, scaledTileSize);


  const playerCenterX = playerX + scaledTileSize / 2;
  const playerCenterY = playerY + scaledTileSize / 2;

  ctx.save()
  ctx.translate(playerCenterX, playerCenterY);
  ctx.rotate(currAngle * Math.PI / 180);

  // Draw the small rectangle
  ctx.fillStyle = 'red';
  ctx.fillRect(-10, -5, 20, 10);

  ctx.restore();

  shootRays(scaledTileSize);
        
}

function gameLoop(timeStamp: number): void {
    if (start === undefined) {
        start = timeStamp;
    }
    var elapsed = timeStamp - start;
    if (elapsed > 1000 / 60) {
        start = timeStamp;

        movePlayer();
        updatePlayer(); 
        
        renderMinimap();
        
    }

    window.requestAnimationFrame(gameLoop);
}


window.requestAnimationFrame(gameLoop);