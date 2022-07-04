/**
 * Swipe Logic
 */
function swipeStart(e) {
     e.preventDefault();
  //  console.log(e);
     let obj = e.touches[0];

     let {clientX,clientY} = obj;

     game.touchCoords.x = clientX;
     game.touchCoords.y = clientY;

}
function swipeMove(e) {
        e.preventDefault();

        let obj = e.touches[0];

        let {x:oldX, y:oldY} = player.coords;

        let {x:newX, y:newY} = player.coords;

        let {clientX, clientY} = obj;

        let diff = {};

        diff.x = clientX - game.touchCoords.x;
        diff.y = clientY - game.touchCoords.y;

        let limit = 10;
        if (Math.abs(diff.x) > limit) {
          
            let x = diff.x/Math.abs(diff.x);

            game.touchCoords.x = clientX;

            if (!player.edgeX(diff)) {
                newX = player.coords.x + x;
            }
        }
        if (Math.abs(diff.y) > limit) {
            let y = diff.y/Math.abs(diff.y);
            game.touchCoords.y = clientY;
            if (!player.edgeY(diff)) {
                newY = player.coords.y + y;
            }

        }
    
        if (game.map[newY][newX] != WALL_CODE) {
           updatePlayerPosition(oldX, oldY, newX, newY);
        }
        else if (game.map[newY][oldX] != WALL_CODE) {
            updatePlayerPosition(oldX, oldY, oldX, newY); 
        }
        else if (game.map[oldY][newX] != WALL_CODE) {
            updatePlayerPosition(oldX, oldY, newX, oldY); 
        }
        else {
            console.log('nothing to do.');
        }
        drawMap(0, 0, COLS, ROWS);

}