

Player.prototype.blockedY = function(diff) {

        let topBounds = DIM / 2;
        let bottomBounds = game.canvas.height - DIM / 2;
        let atTop = diff.y < 0 && this.coords.y <= topBounds;
        let atBot = diff.y > 0 && this.coords.y >= bottomBounds;

        if (atTop) {
            this.coords.y = topBounds;
        } else if (atBot) {
            this.coords.y = bottomBounds;
        }

        return atTop || atBot;
};
Player.prototype.blockedX = function(diff) {

        let rightBounds = game.canvas.width - DIM / 2;
        let leftBounds = DIM / 2;
        let atRight = diff.x > 0 && this.coords.x + DIM / 2 >= game.canvas.width;

        let atLeft = diff.x < 0 && this.coords.x - DIM / 2 <= 0;

        if (atRight) {
            player.coords.x = rightBounds;
        } else if (atLeft) {
            player.coords.x = leftBounds;
        }
        return atRight || atLeft;
    }

/*
function drawPlayer() {
    game.context.clearRect(0, 0, game.canvas.width, game.canvas.height);

    let {
        x,
        y
    } = player.coords;

    x -= TILE_DIM / 2;
    y -= TILE_DIM / 2;

    game.context.beginPath();
    game.context.rect(x, y, TILE_DIM, TILE_DIM);
    game.context.fillStyle = 'green';
    game.context.fill();
}*/


function swipeInit() {
    

    game.canvas.addEventListener('touchstart', swipeStart);
    game.canvas.addEventListener('touchmove', swipeMove);
}
function swipeStart(e) {
     let obj = e.touches[0];

     let {clientX,clientY} = obj;

     game.touchCoords.x = clientX;
     game.touchCoords.y = clientY;

}
function swipeMove(e) {
        let obj = e.touches[0];

        let {clientX, clientY} = obj;

        let diff = {};

        diff.x = clientX - game.touchCoords.x;
        diff.y = clientY - game.touchCoords.y;

        let limit = 10;
        if (Math.abs(diff.x) > limit) {
          
            let x = DIM*diff.x/Math.abs(diff.x);

            game.touchCoords.x = clientX;

            if (!player.blockedX(diff)) {
                player.coords.x += x;
            }
        }

        if (Math.abs(diff.y) > limit) {
            let y = DIM*diff.y/Math.abs(diff.y);
 
            game.touchCoords.y = clientY;
            if (!player.blockedY(diff)) {
              //  diff.y = Math.round(diff.y) * DIM;
                player.coords.y += y;
            }

        }

}
init();