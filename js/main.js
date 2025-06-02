import { Background } from './background.js';
import {Menu} from "./menu.js";
import { Footer } from './footer.js';
import {Game} from "./game.js";


window.onload = function () {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const starCount = 200;
    const background = new Background(starCount, canvas.width, canvas.height);
    const footer = new Footer(canvas.width, canvas.height);
    const menu = new Menu(canvas.width, canvas.height);

    let gameState = 'menu'; // Our state machine variable
    let game = null;

    const music = document.getElementById('background-music');
    const musicButton = document.getElementById('music-toggle-btn');
    music.volume = 0.3; // Set a pleasant volume

    musicButton.addEventListener('click', () => {
        if (music.paused) {
            music.play();
            musicButton.textContent = 'Stop Music';
        } else {
            music.pause();
            musicButton.textContent = 'Play Music';
        }
    });

    canvas.addEventListener('click', (event) => {
        if (gameState === 'menu') {
            const rect = canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;
            const btn = menu.playButton;

            if (mouseX >= btn.x && mouseX <= btn.x + btn.width &&
                mouseY >= btn.y && mouseY <= btn.y + btn.height) {

                console.log('Play button clicked!');
                game = new Game(); // Create a new game instance
                gameState = 'playing'; // Change the state
            }
        } else if (gameState === 'playing') {
            // We will add game click logic here later
        }
    });



    // Create the main animation loop
    function animate() {
        // 1. Clear the canvas with a black background
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 2. Update and draw the background
        background.update();
        background.draw(ctx);

        if (gameState === 'menu') {
            menu.draw(ctx);
        } else if (gameState === 'playing') {
            game.draw(ctx, canvas.width, canvas.height);
        }

        footer.draw(ctx);
        requestAnimationFrame(animate);
    }

    // Start the animation
    animate();
};