export class Footer {
    constructor() {
        this.text = '© 2025 Bonjour, Maria!';
        this.fontSize = {};
        this.position = {}; // A posição será definida no resize
    }

    resize(canvasWidth, canvasHeight) {
        this.fontSize = Math.max(10, canvasWidth / 150);
        this.position = { x: canvasWidth / 2, y: canvasHeight - 30 };
    }

    draw(ctx) {
        if (!this.position.x) return;

        ctx.fillStyle = 'white';
        ctx.font = `${this.fontSize}px "Press Start 2P"`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom'; // Align text from its bottom edge
        ctx.fillText(this.text, this.position.x, this.position.y);
    }

    // handleInput(x, y) {
    //     const btn = this.playAgainButton;
    //     if (btn.width &&
    //         x >= btn.x && x <= btn.x + btn.width &&
    //         y >= btn.y && y <= btn.y + btn.height) {
    //         this.onRestart();
    //     }
    // }
}