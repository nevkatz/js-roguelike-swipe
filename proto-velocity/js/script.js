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

/**
 * Creates a new player. 
 * @class
 * 
 * @property {number} level - starts at one and progresses
 * @property {number} health - keep this above zero
 * @property {string} weapon - ties to an object with a damage rating
 * @property {object} coords - location on the grid
 * @property {number} xp - experience points
 * @property {relics} relics - relics collected
 */
class Player {
    constructor(coords) {
        this.coords = coords;
        this.velocity = {
            x:0,
            y:0
        }
    }
}
Player.prototype.edgeY = function(diff) {

        let topBounds = 0;
        let bottomBounds = ROWS;
        let atTop = diff.y < 0 && this.coords.y <= topBounds;
        let atBot = diff.y > 0 && this.coords.y >= bottomBounds;

        if (atTop) {
            console.log('at top...');
            this.coords.y = topBounds;
        } else if (atBot) {
            this.coords.y = bottomBounds;
        }

        return atTop || atBot;
};
Player.prototype.edgeX = function(diff) {

        let rightBounds = COLS;
        let leftBounds = 0;
        let atRight = diff.x > 0 && this.coords.x + TILE_DIM / 2 >= game.canvas.width;
        let atLeft = diff.x < 0 && this.coords.x - TILE_DIM / 2 <= 0;

        if (atRight) {
            player.coords.x = rightBounds;
        } else if (atLeft) {
            player.coords.x = leftBounds;
        }
        return atRight || atLeft;
}


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
    game.canvas.addEventListener('touchend', swipeEnd);
    game.canvas.addEventListener('touchmove', swipeMove);

    window.setInterval(function() {
        if (player.velocity.x || player.velocity.y) {
          checkPlayer(); 
        }
    },32);
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

function placeItem(coords, tileCode) {

    addObjToMap(coords, tileCode);
    let color = TILE_COLORS[tileCode];
    drawObject(coords.x, coords.y, color);
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
    game.map[coords.y][coords.x] = tileCode;
}
function checkForWin() {

    if (game.enemies.length == 0 &&
        game.itemsLeft(RELIC_CODE) == 0) {
        userWins();
    }
}
function userWins() {
    alert("YOU CONQUERED THE DUNGEON!");
    game.reset();
    startGame();
};

function gameOver() {
    alert("GAME OVER");
    game.reset();
    startGame();
};

function removeObjFromMap(x, y) {
    // make this a floor coordinate
    game.map[y][x] = FLOOR_CODE;
};
function generatePlayer() {

    let coords = {
        x: COLS / 2,
        y: ROWS / 2
    };

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
    removeObjFromMap(oldX, oldY);

    game.map[newY][newX] = PLAYER_CODE;

    player.coords = {
        x: newX,
        y: newY
    };
}

function checkDirection(e) {

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
    e.preventDefault();
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
