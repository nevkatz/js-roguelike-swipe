/**
 * Creates a new game. 
 * @class
 * 
 * @property {Array} map - 2D array storing integer codes
 * @property {Array} shadow - 2D array holding a map of the shadow
 * @property {Boolean} isShadowToggled - is shadow on or off? 
 * @property {HTMLElement} canvas - the DOM element
 * @property {Object} context - the bundle of drawing methods tied to the canvas
 */

class Game {
   constructor() {

      this.map = [];
      this.canvas = null;
      this.context = null;
      this.timer = null;

      this.touchCoords = {
         x:0,
         y:0
      }
   }
}
/**
 * Reset all level-specific properties
 * 
 */
Game.prototype.reset = function() {
   this.map = [];
}

Game.prototype.inRoom = function({x,y}) {
   return this.rooms.find(r => r.encloses(x,y));
}

Game.prototype.addPath = function(path) {
 
   for (var y = path.start.y; y <= path.end.y; ++y) {
      for (var x = path.start.x; x <= path.end.x; ++x) {
         game.map[y][x] = FLOOR_CODE;
      }
   }
}

Game.prototype.resetMap = function() {

   this.map = [];
   this.shadow = [];
   // generate a solid wall.
   for (var row = 0; row < ROWS; row++) {
      // create row
      this.map.push([]);
      this.shadow.push([]);

      for (var col = 0; col < COLS; col++) {
         // create wall
         this.map[row].push(WALL_CODE);
         this.shadow[row].push(SHADOW_CODE);
      }
   }
}
Game.prototype.roomToMap = function(room) {
   for (var y = room.start.y; y <= room.end.y; ++y) {
      for (var x = room.start.x; x <= room.end.x; ++x) {

         this.map[y][x] = FLOOR_CODE;
      }
   }
}
Game.prototype.tileCount = function(tileCode) {
   let count = 0;
   for (var room of game.rooms) {
    count += room.tileCount(tileCode);
   }
   return count;
}


