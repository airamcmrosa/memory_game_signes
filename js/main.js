import { Background } from './background.js';

window.onload = function () {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const starCount = 200;
    const background = new Background(starCount, canvas.width, canvas.height);

    // Create the main animation loop
    function animate() {
        // 1. Clear the canvas with a black background
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 2. Update and draw the background
        background.update();
        background.draw(ctx);

        // 3. Request the next frame
        requestAnimationFrame(animate);
    }

    // Start the animation
    animate();
};