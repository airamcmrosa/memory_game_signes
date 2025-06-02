class Star {
    constructor(canvasWidth, canvasHeight) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.size = Math.random() * 2 + 1; // Size from 1 to 3
        this.speed = Math.random() * 0.5 + 0.1; // Speed from 0.1 to 0.6
    }

    update(canvasWidth) {
        this.x += this.speed;
        // If star goes off the right side, reset it to the left
        if (this.x > canvasWidth) {
            this.x = 0;
        }
    }
    draw(ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }

}

export class Background {
    constructor(starCount, canvasWidth, canvasHeight) {
        this.stars = [];
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;

        for (let i = 0; i < starCount; i++) {
            this.stars.push(new Star(this.canvasWidth, this.canvasHeight));
        }
    }
    update() {
        this.stars.forEach(star => {
            star.update(this.canvasWidth);
        });
    }

    // Add draw method to draw all stars
    draw(ctx) {
        this.stars.forEach(star => {
            star.draw(ctx);
        });
    }
}