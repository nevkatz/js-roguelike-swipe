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

        let offset = {
            x:0,
            y:0
        };

        let diff = {
           x:clientX - game.touchCoords.x,
           y:clientY - game.touchCoords.y
        };

        let limit = 20;
        if (Math.abs(diff.x) > limit) {
          
            let x = diff.x/Math.abs(diff.x);

            game.touchCoords.x = clientX;

            if (!player.blockedX(diff)) {
                newX = player.coords.x + x;
            }
            let direction = (diff.x > 0) ? 'right' : 'left';
            offset = checkOffset(direction, newX, newY, offset);
        }
        if (Math.abs(diff.y) > limit) {
            let y = diff.y/Math.abs(diff.y);
            game.touchCoords.y = clientY;
            if (!player.blockedY(diff)) {
                newY = player.coords.y + y;
            }
            let direction = (diff.y > 0) ? 'down' : 'up';
            offset = checkOffset(direction, newX, newY, offset);

        }
        const freeTile = (x,y) => {
            let tileCode = game.map[y][x];
            let solidTiles = [WALL_CODE, ENEMY_CODE];
            return !solidTiles.includes(tileCode);
        }

        /**
         * @TODO: Move to other code. 
         */ 
        if (offset.x != 0 || offset.y != 0) {
            console.log('offset:');
            console.log(offset);
        }

        if (freeTile(newX,newY)) {
            movePlayer(newX, newY, offset);
        }

        else if (newY != oldY && freeTile(oldX,newY)) {
   
            movePlayer(oldX, newY, offset); 
        }
        else if (newX != oldX && freeTile(newX,oldY)) {

            movePlayer(newX, oldY, offset); 
        }
        else if (game.map[newY][newX] == ENEMY_CODE) {
            console.log('check enemy.');
          checkEnemy(newX, newY);   
        }
        else {
            console.log('nothing to do.');
        }

     

}