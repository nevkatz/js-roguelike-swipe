/**
 * Swipe Logic
 */
function swipeStart(event) {

     if (event.touches.length == 1) {

        event.preventDefault();

        let obj = event.touches[0];

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
    stopCoast();
}

function setVelocityX(diff, clientX, clientY, newX, newY) {
    stopCoast();

    player.velocity.x = diff.x / Math.abs(diff.x);
    
    game.touchCoords.x = clientX;

    newX = player.coords.x + player.velocity.x;
    
    return newX;
}

function setVelocityY(diff, clientX, clientY, newX, newY) {
    
    stopCoast();
    
    player.velocity.y = diff.y / Math.abs(diff.y);
    
    game.touchCoords.y = clientY;

    newY = player.coords.y + player.velocity.y;
    
    return newY;
}

function swipeMove(event) {

    if (event.touches.length == 1) {

        event.preventDefault();
        
        let obj = event.touches[0];

        let {
            x: oldX,
            y: oldY
        } = player.coords;

        let {
            x: newX,
            y: newY
        } = player.coords;

        let {
            clientX,
            clientY
        } = obj;

        let diff = {
            x: clientX - game.touchCoords.x,
            y: clientY - game.touchCoords.y
        };
        const threshold = 20;
        const diag_threshold = 14.14;


        if (Math.abs(diff.x) > diag_threshold &&
            Math.abs(diff.y) > diag_threshold) {
            newX = setVelocityX(diff, clientX, clientY, newX, newY);
            newY = setVelocityY(diff, clientX, clientY, newX, newY);

        } else if (Math.abs(diff.x) > threshold) {
            newX = setVelocityX(diff, clientX, clientY, newX, newY);
            player.velocity.y = 0;

        } else if (Math.abs(diff.y) > threshold) {
            newY = setVelocityY(diff, clientX, clientY, newX, newY);
            player.velocity.x = 0;
        }

        if (newY != oldY || newX != oldX) {

            checkPlayer(oldX, oldY, newX, newY);

            if (!game.timer) {
                let delay = 125;
                game.timer = window.setTimeout(function() {
                    window.requestAnimationFrame(coastPlayer);
                }, delay);
          
            }
        } 

    }


}

function stopCoast() {

    window.clearTimeout(game.timer);
    game.timer = null;
    drawMap(0, 0, COLS, ROWS);
}


function coastPlayer() {

    let {x,y} = player.velocity;

    const { x: oldX, y: oldY} = player.coords;

    let {x: newX,y: newY} = player.coords;

    if (x) {
        newX = player.coords.x + x;
    }
    if (y) {
        newY = player.coords.y + y;
    }

    checkPlayer(oldX, oldY, newX, newY);

    if (game.timer) {
        let delay = 100;
        game.timer = window.setTimeout(function() {
            window.requestAnimationFrame(coastPlayer);
        }, delay);
    }
}

function checkPlayer(oldX, oldY, newX, newY) {
    const freeTile = (x, y) => {
        return game.map[y][x] != WALL_CODE;
    }
    if (freeTile(newX, newY)) {
        movePlayer(newX, newY);
    } else if (newY != oldY && freeTile(oldX, newY)) {
        movePlayer(oldX, newY);
    } else if (newX != oldX && freeTile(newX, oldY)) {
        movePlayer(newX, oldY);
    } else {
        stopCoast();
    }
}