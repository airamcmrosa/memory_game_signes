
class Star {
    constructor() {
        // We'll add x, y, size, speed, etc., in the next TDD cycle.
    }
}


export class Background {
    constructor(starCount) {
        this.stars = []; // 1. Create the stars array.

        // 2. Loop 'starCount' times.
        for (let i = 0; i < starCount; i++) {
            // 3. Add a new Star instance to the array.
            this.stars.push(new Star());
        }
    }
}