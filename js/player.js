/**
 *  This is used for the scrolling version.
 *  In the proto-swipe version, the player code is in script.js.
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
   constructor(level, health, weapon, coords, xp, relics, src) {
      this.level = level;
      this.health = health;
      this.weapon = weapon;
      this.coords = coords;
      this.velocity = {
         x:0,
         y:0
      };
      /* for sprites*/
      if (src) {

         this.image = new Image();
         this.image.src = src;
         let {x, y} = coords;
         let obj = this;
         this.image.onload = function() {
            console.log('draw!');
            game.context.drawImage(obj.image, x*TILE_DIM, y*TILE_DIM,IMG_SZ, IMG_SZ);
         };
      }
   
      this.relics = relics;
      this.xp = xp;
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
        let atRight = diff.x > 0 && this.coords.x >= rightBounds;
        let atLeft = diff.x < 0 && this.coords.x <= leftBounds;

        if (atRight) {
            player.coords.x = rightBounds;
        } else if (atLeft) {
            player.coords.x = leftBounds;
        }
        return atRight || atLeft;
}
