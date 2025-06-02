class Star {
    constructor(canvasWidth, canvasHeight) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.size = Math.random() * 2 + 1; // Size from 1 to 3
        this.speed = Math.random() * 0.5 + 0.1; // Speed from 0.1 to 0.6
        // --- NEW PROPERTIES FOR TWINKLING ---
        // Start with a random opacity
        this.opacity = Math.random();
        this.twinkleSpeed = Math.random() * 0.007;
        this.twinkleDirection = 1;
    }

    update() {
        // Update the opacity
        this.opacity += this.twinkleDirection * this.twinkleSpeed;

        // If the star is fully opaque or fully transparent, reverse the direction
        if (this.opacity > 1) {
            this.opacity = 1;
            this.twinkleDirection = -1;
        } else if (this.opacity < 0) {
            this.opacity = 0;
            this.twinkleDirection = 1;
        }
    }

    draw(ctx) {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
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