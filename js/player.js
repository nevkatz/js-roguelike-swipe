/**
 * Creates a new player. 
 * @class
 * 
 * @property {object} coords - location on the grid
 */
class Player {
    constructor(coords) {
        this.coords = coords;

        this.velocity = {
            x:0,
            y:0
        };
    }
}
Player.prototype.edgeY = function(diff) {

        let topBounds = 0;
        let bottomBounds = ROWS;
        let atTop = diff.y < 0 && this.coords.y <= topBounds;
        let atBot = diff.y > 0 && this.coords.y >= bottomBounds;

        if (atTop) {
            this.coords.y = topBounds;
        } else if (atBot) {
            this.coords.y = bottomBounds;
        }

        return atTop || atBot;
};
Player.prototype.edgeX = function(diff) {

        let rightBounds = COLS;
        let leftBounds = 0;
        let atRight = diff.x > 0 && this.coords.x + TILE_DIM / 2 >= game.canvas.width;
        let atLeft = diff.x < 0 && this.coords.x - TILE_DIM / 2 <= 0;

        if (atRight) {
            player.coords.x = rightBounds;
        } else if (atLeft) {
            player.coords.x = leftBounds;
        }
        return atRight || atLeft;
}