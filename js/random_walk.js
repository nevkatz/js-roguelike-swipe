/**
 * The generate map function
 * 
 * This algorithmm starts in the center and works its way outward.
 */
function randomWalk() {
   // generate a solid wall.

   game.map = [];
   game.shadow = [];
   for (var row = 0; row < ROWS; row++) {
      // create row
      game.map.push([]);


      for (var col = 0; col < COLS; col++) {
         // create wall
         game.map[row].push(WALL_CODE);
      }
   }
   // set up total number of tiles used
   // and the total number of penalties made

   
   let pos = { 
      x:COLS/2,
      y:ROWS/2
   };

   const ATTEMPTS = 30000;
   const MAX_PENALTIES_COUNT = 1000;
   const MINIMUM_TILES_AMOUNT = 1000;
   const OUTER_LIMIT = 3;

   const randomDirection = () => Math.random() <= 0.5 ? -1 : 1;

   let tiles = 0, penalties = 0;

   for (var i = 0; i < ATTEMPTS; i++) {

      // choose an axis to dig on.
      let axis = Math.random() <= 0.5 ? 'x' : 'y';

      // get the number of rows or columns, depending on the axis.
      let numCells = axis == 'x' ? COLS : ROWS;

      // choose the positive or negative direction.
      pos[axis] += randomDirection();

      // if we are on the far left or far right, find another value.

      // we don't want to dig here so let's find a way to get out
      while (pos[axis] < OUTER_LIMIT || pos[axis] >= numCells - OUTER_LIMIT) {

            pos[axis] += randomDirection();

            penalties++;

            if (penalties > MAX_PENALTIES_COUNT) {

               // if we have used up our tiles, we're done.
               if (tiles >= MINIMUM_TILES_AMOUNT) {
                  return;
               }
                  // bring coords back to center
               pos.x = COLS / 2;
               pos.y = ROWS / 2;
            }
      } 

      let {x, y} = pos;

      // if not a floor, make this a floor
      if (game.map[y][x] != FLOOR_CODE) {

         game.map[y][x] = FLOOR_CODE;
         // we use up a tile.
         tiles++;
      }
      penalties = 0;

   } // end the large loop
}