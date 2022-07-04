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
}
function swipeMove(e) {
    e.preventDefault();

        let obj = e.touches[0];

        let {clientX, clientY} = obj;

        let diff = {};

        diff.x = clientX - game.touchCoords.x;
        diff.y = clientY - game.touchCoords.y;

        const threshold = 10;

        if (Math.abs(diff.x) > threshold) {
            player.velocity.x = diff.x/Math.abs(diff.x);
            game.touchCoords.x = clientX;
           
        }
        else {
           // player.velocity.x = 0;
        }
        if (Math.abs(diff.y) > threshold) {
            player.velocity.y = diff.y/Math.abs(diff.y);
            game.touchCoords.y = clientY;
        }
        else {
            //player.velocity.y = 0;
        }
        drawMap(0, 0, COLS, ROWS);

}
function checkPlayer() {

    let {x:oldX, y:oldY} = player.coords;

    let {x:newX, y:newY} = player.coords;

    if (player.velocity.x && !player.edgeX(player.velocity)) {
        newX = player.coords.x + player.velocity.x;
    }
    if (player.velocity.y && !player.edgeY(player.velocity)) {
        newY = player.coords.y + player.velocity.y;
    }
    if (oldY != newY || oldX != newX) {
        attemptMove(oldX, oldY, newX, newY);
    }    
    printVelocity();
}
function attemptMove(oldX, oldY, newX, newY) {
    if (game.map[newY][newX] != WALL_CODE) {
        console.log('full move');
        movePlayer(newX, newY);
    }
    else if (game.map[newY][oldX] != WALL_CODE) {
        console.log('vert move');
        movePlayer(oldX, newY); 
    }
    else if (game.map[oldY][newX] != WALL_CODE) {
        console.log('horiz move');
        movePlayer(newX, oldY); 
    }
    else {
        console.log('nothing to do.');
    }

}
function printVelocity() {
    let log = document.getElementById('log');

    log.textContent = `${player.velocity.x},${player.velocity.y}`;
}