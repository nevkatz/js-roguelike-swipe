/**
 *  Game Constants
 * 
 */
// dimensions
const COLS = 80;
const ROWS = 60;

const TILE_DIM = 10;

const DEBUG = true;

const OUTER_LIMIT = 3;

const WALL_CODE = 0;
const FLOOR_CODE = 1;
const PLAYER_CODE = 2;

// the visible area
const VISIBILITY = 3;

const TILE_COLORS = [
    // wall
    'grey',
    // floor
    'white',
    // player
    'blue',
    // relic
    '#a117f2'
];
/**
 * Classes 
 */




function createDOM() {

    let container = document.getElementById('container');

    // add canvas
    let canvas = document.createElement('canvas');
    canvas.id = 'grid';
    canvas.height = ROWS * TILE_DIM;
    canvas.width = COLS * TILE_DIM;
    container.appendChild(canvas);
}
/**
 *  HTML5 Canvas
 */
var game = null;
var player = null;

function init() {
    createDOM();
    game = new Game();
    game.canvas = document.getElementById("grid");
    game.context = game.canvas.getContext("2d");
    startGame();
    document.addEventListener('keydown', checkDirection);
    game.canvas.addEventListener('touchstart', swipeStart);
    game.canvas.addEventListener('touchmove', swipeMove);
}
init();
/**
 * Start Game
 */
function startGame() {
    randomWalk();
    generatePlayer();
    drawMap(0, 0, COLS, ROWS);
}


/**
 *
 * @param {Number} startX
 * @param {Number} startY
 * @param {Number} endX
 * @param {Number} endY
 * 
 */
function drawMap(startX, startY, endX, endY) {

    // loop through all cells of the map
    for (var row = startY; row < endY; row++) {

        for (var col = startX; col < endX; col++) {

            let c_idx = game.map[row][col];

            let color = TILE_COLORS[c_idx];
            
            drawObject(col, row, color);

        } // end loop
    }
}
/**
 * Coordinate Helper Functions
 */
function generateValidCoords() {

    var x = null,
        y = null;

    let turns = 0,
        limit = 100;

    do {
        x = Math.floor(Math.random() * COLS);
        y = Math.floor(Math.random() * ROWS);
        turns++;
    }
    while (game.map[y][x] != FLOOR_CODE && turns < limit);

    return {
        x,
        y
    };

}

function pickRandom(arr) {
    let idx = Math.floor(Math.random() * arr.length);

    return arr[idx];
}

// add given coords to map 
// make the coords and neighbors busy
// and draw object with given color
function addObjToMap(coords, tileCode) {
    console.log('tileCode: ' + tileCode + ' coords: ' + coords);
    game.map[coords.y][coords.x] = tileCode;
}

function generatePlayer() {

    let coords = {
        x: COLS / 2,
        y: ROWS / 2
    };
    console.log('coords: ' + coords);

    // level, health, weapon, coords, xp
    player = new Player(coords);

    addObjToMap(player.coords, PLAYER_CODE);
}
/**
 * Removes old player square from map
 * Adds new square
 * @param {Number} oldX
 * @param {Number} oldY
 * @param {Number} newX
 * @param {Number} newY
 */
function updatePlayerPosition(oldX, oldY, newX, newY) {

    game.map[oldY][oldX] = FLOOR_CODE;

    game.map[newY][newX] = PLAYER_CODE;

    player.coords = {
        x: newX,
        y: newY
    };
}

function checkDirection(e) {
    e.preventDefault();

    let {x, y} = player.coords;

    switch (e.which) {
        case 37: // left
            x--;
            break;
        case 38: // up
            y--;
            break;
        case 39: // right
            x++;
            break;
        case 40: // down
            y++;
            break;
        default:
            return;
            break;
    }
    if (game.map[y][x] != WALL_CODE) {
        movePlayer(x, y);
    }
}

/**
 * @TODO: In Phase 2, add argument for offset.
 */ 
function movePlayer(x,y) {
    let {x: oldX,y: oldY} = player.coords;

    updatePlayerPosition(oldX, oldY, x, y);

     let left = oldX - 1;
     let top = oldY - 1;
     let right = x + 2;
     let bot = y + 2;

    drawMap(left, top, right, bot);
}
/**
 * @param {Number} x
 * @param {Number} y
 * @param {String} color
 */
function drawObject(x, y, color) {

    game.context.beginPath();
    game.context.rect(x * TILE_DIM, y * TILE_DIM, TILE_DIM, TILE_DIM);
    game.context.fillStyle = color;
    game.context.fill();
}
