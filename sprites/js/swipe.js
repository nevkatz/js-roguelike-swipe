/**
 * Swipe Logic
 */

function swipeStart(e) {
    e.preventDefault();
  
     let obj = e.touches[0];

     let {clientX,clientY} = obj;

     game.touchCoords.x = clientX;
     game.touchCoords.y = clientY;

}
function swipeEnd(e) {
    e.preventDefault();
    player.velocity = {
        x:0,
        y:0
    };
    window.clearInterval(game.timer);

    game.timer = null;
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
        let threshold = 20;
 
        if (Math.abs(diff.x) > threshold) {
             window.clearInterval(game.timer);
             game.timer = null;
          
            player.velocity.x = diff.x/Math.abs(diff.x);
            game.touchCoords.x = clientX;
            
            if (!player.edgeX(diff)) {
                newX = player.coords.x + player.velocity.x;
                let direction = (diff.x > 0) ? 'right' : 'left';
                offset = checkOffset(direction, newX, newY, offset);
            }
        }
        if (Math.abs(diff.y) > threshold) {
             window.clearInterval(game.timer);
             game.timer = null;
            player.velocity.y = diff.y/Math.abs(diff.y);
            game.touchCoords.y = clientY;
            if (!player.edgeY(diff)) {
                newY = player.coords.y + player.velocity.y;
                let direction = (diff.y > 0) ? 'down' : 'up';
                offset = checkOffset(direction, newX, newY, offset);
            }
        }
        if (newY != oldY || newX != oldX) {
            let {x, y} = player.velocity;
            checkPlayer(oldX, oldY, newX, newY, offset);

            if (!game.timer) {
              let delay = 100;
              game.timer = window.setInterval(function() {
                coast();
              }, delay);
            }
        }
        else {
           let {x, y} = player.velocity;
        }

}
function coast() {
    let {x, y} = player.velocity;
    let offset = {
        x:0,
        y:0
    };
    let {x:oldX, y:oldY} = player.coords;

    let {x:newX, y:newY} = player.coords;
   
    if (x && !player.edgeX(x)) {
       newX = player.coords.x + x;
       let direction = (x > 0) ? 'right' : 'left';
       offset = checkOffset(direction, newX, newY, offset);
    }
    if (y && !player.edgeY(y)) {
        newY = player.coords.y + y;
        let direction = (y > 0) ? 'down' : 'up';
        offset = checkOffset(direction, newX, newY, offset);
    }
    checkPlayer(oldX, oldY, newX, newY, offset);
}
function checkPlayer(oldX, oldY, newX, newY, offset) {
        const freeTile = (x,y) => {
            let tileCode = game.map[y][x];
            let solidTiles = [WALL_CODE, ENEMY_CODE];
            return !solidTiles.includes(tileCode);
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
            checkEnemy(newX, newY);   
        }
        else {
            console.log('nothing to do.');
        }
}