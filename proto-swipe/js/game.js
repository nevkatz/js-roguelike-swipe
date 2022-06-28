/**
 * Creates a new game. 
 * @class
 * 
 * @property {Array} map - 2D array storing integer codes
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
      };

   }
}
Game.prototype.reset = function() {
   this.map = [];
   window.clearInterval(timer);
   timer = null;
}

Game.prototype.resetMap = function() {

   this.map = [];
   // generate a solid wall.
   for (var row = 0; row < ROWS; row++) {
      // create row
      this.map.push([]);

      for (var col = 0; col < COLS; col++) {
         // create wall
         this.map[row].push(WALL_CODE);
      }
   }
}


