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
    window.clearTimeout(game.timer);

    game.timer = null;
}
function stopCoast() {
    window.clearInterval(game.timer);
    window.clearTimeout(game.timer);
    game.timer = null;
}
function setVelocityX(diff, clientX, clientY, newX, newY, min) {

    const coop_threshold = 10;
    stopCoast();
    player.velocity.x = diff.x/Math.abs(diff.x);
    game.touchCoords.x = clientX;
            
    if (!player.edgeX(diff)) {
        newX = player.coords.x + player.velocity.x;
     

    }
    if (Math.abs(diff.y) < min && diff.y != 0) {
        console.log('reset y');
        diff.y = 0;
        game.touchCoords.y = clientY;
    }
   
    return newX;
}
function setVelocityY(diff,clientX,clientY,newX, newY, min) {

        console.log('move y');
        stopCoast();
        player.velocity.y = diff.y/Math.abs(diff.y);
        game.touchCoords.y = clientY;
        if (!player.edgeY(diff)) {
                newY = player.coords.y + player.velocity.y;
  
        }
        if (Math.abs(diff.x) < min && diff.x != 0) {

           console.log('reset x');
           diff.x = 0;
           game.touchCoords.x = clientX;
       }
    

      return newY;
}
function swipeMove(e) {
        e.preventDefault();

        let obj = e.touches[0];

        let {x:oldX, y:oldY} = player.coords;

        let {x:newX, y:newY} = player.coords;

        let {clientX, clientY} = obj;

        let diff = {
           x:clientX - game.touchCoords.x,
           y:clientY - game.touchCoords.y
        };
        const threshold = 20;
        const coop_threshold = 14
        const min = 2;
        console.log(`diff: ${diff.x},${diff.y}`);


        if (Math.abs(diff.x) > coop_threshold &&
            Math.abs(diff.y) > coop_threshold) {
            console.log('diagonal')
            newX = setVelocityX(diff, clientX, clientY, newX, newY, 0);
            newY = setVelocityY(diff, clientX, clientY, newX, newY, 0);

        }
        else if (Math.abs(diff.x) > threshold) {
            newX = setVelocityX(diff, clientX, clientY, newX, newY, min);
        }
        else if (Math.abs(diff.y) > threshold) {
            newY = setVelocityY(diff, clientX, clientY, newX, newY, min);
        }
     


        if (newY != oldY || newX != oldX) {
            let {x, y} = player.velocity;
            console.log(`velocity ${x},${y}`);
            checkPlayer(oldX, oldY, newX, newY);

            if (!game.timer) {
              let delay = 50;
              game.timer = window.setTimeout(function() {
                coast();
              }, delay);
            }
        }
        else {
           let {x, y} = player.velocity;
        }

}
function coast() {
    let delay = 100;
    game.timer = window.setInterval(function() {
        inertia();
    }, delay);         
}
function inertia() {
    let {x, y} = player.velocity;

    let {x:oldX, y:oldY} = player.coords;

    let {x:newX, y:newY} = player.coords;
   
    if (x && !player.edgeX(x)) {
       newX = player.coords.x + x;
    }
    if (y && !player.edgeY(y)) {
        newY = player.coords.y + y;
    }
    checkPlayer(oldX, oldY, newX, newY);
}
function checkPlayer(oldX, oldY, newX, newY) {
        const freeTile = (x,y) => {
            let tileCode = game.map[y][x];
            let solidTiles = [WALL_CODE, ENEMY_CODE];
            return !solidTiles.includes(tileCode);
        }
        if (freeTile(newX,newY)) {
            movePlayer(newX, newY);
        }
        else if (newY != oldY && freeTile(oldX,newY)) {
            movePlayer(oldX, newY); 
        }
        else if (newX != oldX && freeTile(newX,oldY)) {
            movePlayer(newX, oldY); 
        }
        else if (game.map[newY][newX] == ENEMY_CODE) {
            checkEnemy(newX, newY);   
        }
        else {
            console.log('nothing to do.');
        }
}