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
