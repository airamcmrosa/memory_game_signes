export class Menu {
    constructor() {
        this.title = 'Caractéristiques du Zodiaque';
        this.titleFontSize = {};
        this.buttonFontSize = {};

        this.titlePosition = {};
        this.playButton = {};
    }


    resize(canvasWidth, canvasHeight) {
        this.titleFontSize = Math.max(12, canvasWidth / 30);
        this.buttonFontSize = Math.max(10, this.titleFontSize / 2);
        const titleY = canvasHeight / 2 - 80;
        const buttonY = titleY + this.titleFontSize + 60;

        this.titlePosition = { x: canvasWidth / 2, y: titleY };

        const btnWidth = Math.min(canvasWidth / 4, 320); // Usa 1/4 da tela, mas no máximo 300px
        const btnHeight = 70;

        this.playButton = {
            width: btnWidth,
            height: btnHeight,
            // Calcula o X para que o botão fique centralizado
            x: (canvasWidth / 2) - (btnWidth / 2),
            y: buttonY,
            text: 'Play'
        };
    }

    draw(ctx) {

        ctx.fillStyle = 'white';
        ctx.font = `${this.titleFontSize}px "Press Start 2P"`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.title, this.titlePosition.x, this.titlePosition.y);

        // Draw Button
        const btn = this.playButton;
        if (!btn.width) return;

        ctx.strokeStyle = 'white';
        ctx.lineWidth = 3;
        ctx.strokeRect(btn.x, btn.y, btn.width, btn.height);


        ctx.fillStyle = 'white';
        ctx.font = `${this.buttonFontSize}px "Press Start 2P"`;
        ctx.fillText(btn.text, this.titlePosition.x, btn.y + btn.height / 2);



    }
}
