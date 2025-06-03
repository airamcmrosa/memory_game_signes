export class EndScreen {
    constructor(onRestartCallBack) {
        this.onRestart = onRestartCallBack;

        this.titleFontSize = 0;
        this.buttonFontSize = 0;

        this.colors = {
            gold: '#FFD700',
            peach: '#FFCBA4',
            text: '#FFFFFF',
            textDark: '#4a4a4a',
            overlay: 'rgba(13, 10, 26, 0.8)'
        };

        this.playAgainButton = {
            x: 0, y: 0, width: 0, height: 0,
            text: 'Play Again',
            cornerRadius: 20
        };

    }

    resize(canvasWidth, canvasHeight) {
        this.titleFontSize = Math.max(18, canvas.width / 25);
        this.buttonFontSize = Math.max(10, titleFontSize / 2);

        const btnWidth = Math.min(canvas.width / 3.5, 320);
        const btnHeight = 70;

        this.playAgainButton = {
            width: btnWidth,
            height: btnHeight,
            x: canvas.width / 2 - (btnWidth / 2),
            y: canvas.height / 2,
            text: 'Play Again'
        };
    }

    draw (ctx, canvasWidth, canvasHeight) {

        ctx.fillStyle = this.colors.overlay;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        ctx.font = `${this.titleFontSize}px "Press Start 2P"`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Félicitations!', canvas.width / 2, canvas.height / 2 - 80);
        ctx.fillStyle = this.colors.text;

        const btn = this.playAgainButton;
        if (!btn.width) return;

        ctx.strokeStyle = this.colors.text;
        ctx.lineWidth = 3;
        ctx.strokeRect(btn.x, btn.y, btn.width, btn.height);

        ctx.font = `${this.buttonFontSize}px "Press Start 2P"`;
        ctx.fillText(btn.text, canvas.width / 2, btn.y + btn.height / 2);



    }

    handleInput(x, y) {

        if (this.playAgainButton.width &&
            x >= this.playAgainButton.x && x <= this.playAgainButton.x + this.playAgainButton.width &&
            y >= this.playAgainButton.y && y <= this.playAgainButton.y + this.playAgainButton.height) {

            this.onRestart();
        }
    }

}