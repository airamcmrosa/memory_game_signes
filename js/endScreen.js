export class EndScreen {
    constructor(onRestartCallBack) {
        this.onRestart = onRestartCallBack;

        this.titleFontSize = 0;
        this.buttonFontSize = 0;

        this.colors = {
            text: '#FFFFFF',
            textDark: '#4a4a4a',
            overlay: 'rgba(0, 0, 0, 0.8)'
        };

        this.playAgainButton = {
            x: 0, y: 0, width: 0, height: 0,
            text: 'Play Again'
        };

    }

    resize(canvasWidth, canvasHeight) {
        this.titleFontSize = Math.max(18, canvasWidth / 25);
        this.buttonFontSize = Math.max(10, this.titleFontSize / 2);

        const btnWidth = Math.min(canvasWidth / 3.5, 320);
        const btnHeight = 70;

        this.playAgainButton = {
            ...this.playAgainButton,
            width: btnWidth,
            height: btnHeight,
            x: canvasWidth / 2 - (btnWidth / 2),
            y: canvasHeight / 2,
        };
    }

    draw (ctx, canvasWidth, canvasHeight) {

        ctx.fillStyle = this.colors.overlay;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        ctx.fillStyle = this.colors.text;
        ctx.font = `${this.titleFontSize}px "Press Start 2P"`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Félicitations!', canvasWidth / 2, canvasHeight / 2 - 80);


        const btn = this.playAgainButton;
        if (!btn.width) return;

        ctx.strokeStyle = this.colors.text;
        ctx.lineWidth = 3;
        ctx.strokeRect(btn.x, btn.y, btn.width, btn.height);

        ctx.font = `${this.buttonFontSize}px "Press Start 2P"`;
        ctx.fillText(btn.text, btn.x + btn.width / 2, btn.y + btn.height / 2);



    }

    handleInput(x, y) {
        const btn = this.playAgainButton;
        if (btn.width &&
            x >= btn.x && x <= btn.x + btn.width &&
            y >= btn.y && y <= btn.y + btn.height) {
            this.onRestart();
        }
    }

}