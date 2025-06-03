import { Background } from './background.js';
import {Menu} from "./menu.js";
import { Footer } from './footer.js';
import {Game} from "./game.js";
import {SoundManager} from "./soundManager.js";



window.onload = function () {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const starCount = 200;
    const background = new Background(starCount);
    const footer = new Footer();
    const menu = new Menu();

    let gameState = 'menu';
    let game = null;
    let playAgainButton = {};

    const soundManager = new SoundManager({
        click: 'click-sound',
        match: 'match-sound'
    });

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;


        background.resize(canvas.width, canvas.height);
        footer.resize(canvas.width, canvas.height);
        menu.resize(canvas.width, canvas.height);

        if (gameState === 'playing' || gameState === 'gameOver') {
            game.resize(canvas.width, canvas.height);
        }
    }

    window.addEventListener('resize', resize);
    resize()

    function isClickInside(button, x, y) {
        return x >= button.x && x <= button.x + button.width &&
            y >= button.y && y <= button.y + button.height;
    }


    function startGame() {
        game = new Game(() => { gameState = 'gameOver'; }, canvas.width, canvas.height, soundManager);
        gameState = 'playing';
    }

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

    function handleInteraction(event) {

        event.preventDefault();

        const rect = canvas.getBoundingClientRect();
        let mouseX, mouseY;


        if (event.touches && event.touches.length > 0) {
            mouseX = event.touches[0].clientX - rect.left;
            mouseY = event.touches[0].clientY - rect.top;
        } else {

            mouseX = event.clientX - rect.left;
            mouseY = event.clientY - rect.top;
        }

        if (gameState === 'menu' && isClickInside(menu.playButton, mouseX, mouseY)) {
            startGame();
        } else if (gameState === 'playing') {
            game.handleGameInput(mouseX, mouseY);
        } else if (gameState === 'gameOver' && isClickInside(playAgainButton, mouseX, mouseY)) {
            startGame();
        }
    }

    canvas.addEventListener('click', handleInteraction);
    canvas.addEventListener('touchstart', handleInteraction);

    function drawEndGameScreen() {




    }


    // Create the main animation loop
    function animate() {

        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);


        background.update();
        background.draw(ctx);

        if (gameState === 'menu') {
            menu.draw(ctx);
        } else if (gameState === 'playing') {
            game.draw(ctx);
        } else if (gameState === 'gameOver') {

            game.draw(ctx);
            drawEndGameScreen();
        }
        footer.draw(ctx);
        requestAnimationFrame(animate);
    }

    animate();
};