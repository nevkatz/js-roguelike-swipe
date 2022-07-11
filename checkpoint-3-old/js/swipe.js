/**
 * Swipe Logic
 */
function swipeStart(e) {

    if (e.touches.length == 1) {

        e.preventDefault();

        let obj = e.touches[0];

        let {clientX, clientY} = obj;

        game.touchCoords.x = clientX;
        game.touchCoords.y = clientY;

    }
}
function swipeEnd(e) {
    e.preventDefault();
    player.velocity = {
        x: 0,
        y: 0
    };
}
function setVelocityX(diff, clientX, clientY, newX, newY) {

    player.velocity.x = diff.x / Math.abs(diff.x);
    game.touchCoords.x = clientX;

    if (!player.edgeX(diff)) {
        newX = player.coords.x + player.velocity.x;
    }

    return newX;
}
function setVelocityY(diff, clientX, clientY, newX, newY) {

    player.velocity.y = diff.y / Math.abs(diff.y);
    game.touchCoords.y = clientY;
    if (!player.edgeY(diff)) {
        newY = player.coords.y + player.velocity.y;
    }

    return newY;
}
function swipeMove(e) {

    if (e.touches.length == 1) {

        e.preventDefault();
        
        let obj = e.touches[0];

        let { x: oldX,y: oldY} = player.coords;

        let {x: newX,y: newY} = player.coords;

        let {clientX,clientY} = obj;

        let diff = {
            x: clientX - game.touchCoords.x,
            y: clientY - game.touchCoords.y
        };
        const threshold = 20;

        if (Math.abs(diff.x) > threshold) {
            newX = setVelocityX(diff, clientX, clientY, newX, newY);
        }

        if (Math.abs(diff.y) > threshold) {
            newY = setVelocityY(diff, clientX, clientY, newX, newYn);
        }

        if (newY != oldY || newX != oldX) {
            checkPlayer(oldX, oldY, newX, newY);
        }
    }
}
function checkPlayer(oldX, oldY, newX, newY) {
    const freeTile = (x, y) => game.map[y][x] != WALL_CODE;
    
    if (freeTile(newX, newY)) {
        movePlayer(newX, newY);
    }
 
}