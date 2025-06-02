export class Game {
    constructor(onGameOver, canvasWidth, canvasHeight) {
        this.onGameOver = onGameOver;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;

        const characters = [
            {signe: "Bélier", caractéristique: "susceptible", signeFile: "belier", caracteristiqueFile: "susceptible"},
            {signe: "Taureau", caractéristique: "déterminé", signeFile: "taureau", caracteristiqueFile: "determine"},
            {signe: "Gémeaux", caractéristique: "curieux", signeFile: "gemeaux", caracteristiqueFile: "curieux"},
            {signe: "Cancer", caractéristique: "émotif", signeFile: "cancer", caracteristiqueFile: "emotif"},
            {signe: "Lion", caractéristique: "charismatique", signeFile: "lion", caracteristiqueFile: "charismatique"},
            {
                signe: "Vierge",
                caractéristique: "perfectionniste",
                signeFile: "vierge",
                caracteristiqueFile: "perfectionniste"
            },
            {signe: "Balance", caractéristique: "équilibré", signeFile: "balance", caracteristiqueFile: "equilibre"},
            {signe: "Scorpion", caractéristique: "passionné", signeFile: "scorpion", caracteristiqueFile: "passionne"},
            {
                signe: "Sagittaire",
                caractéristique: "aventurier",
                signeFile: "sagittaire",
                caracteristiqueFile: "aventurier"
            },
            {
                signe: "Capricorne",
                caractéristique: "ambitieux",
                signeFile: "capricorne",
                caracteristiqueFile: "ambitieux"
            },
            {
                signe: "Verseau",
                caractéristique: "indépendant",
                signeFile: "verseau",
                caracteristiqueFile: "independant"
            },
            {signe: "Poissons", caractéristique: "imaginatif", signeFile: "poissons", caracteristiqueFile: "imaginatif"}
        ];
        this.deck = [];

        this.layout = {};
        this.initializeDeckAndLayout(characters);
        this.loadImages();
    }

    initializeDeckAndLayout(characters) {
        const shuffledCharacters = characters.sort(() => 0.5 - Math.random());
        const selectedCharacters = shuffledCharacters.slice(0, 6);
        const cardPairs = [];
        selectedCharacters.forEach((character, index) => {
            cardPairs.push({
                type: 'signe', value: character.signe, imageFile: character.signeFile, pairId: index,
                isFlipped: false, isMatched: false
            });
            cardPairs.push({
                type: 'caracteristique', value: character.caractéristique, imageFile: character.caracteristiqueFile, pairId: index,
                isFlipped: false, isMatched: false
            });
        });
        this.deck = cardPairs.sort(() => 0.5 - Math.random());

        // Configura o estado inicial do jogo
        this.flippedCards = [];
        this.cardImages = {};
        this.imagesLoaded = 0;
        this.totalImages = this.deck.length + 1;

        // Calcula o layout inicial
        this.resize(this.canvasWidth, this.canvasHeight);
    }
    loadImages() {
        this.backImage = new Image();
        this.backImage.src = './images/back.png';
        this.backImage.onload = () => this.imageLoaded();

        this.deck.forEach(card => {
            this.cardImages[card.imageFile] = new Image();
            this.cardImages[card.imageFile].src = `images/${card.imageFile}.png`;
            this.cardImages[card.imageFile].onload = () => this.imageLoaded();
        });
    }
    calculateLayout(canvasWidth, canvasHeight) {
        const isPortrait = canvasHeight > canvasWidth;

        // Define o número de colunas baseado na orientação da tela
        const cardsPerRow = isPortrait ? 3 : 6;
        const numRows = 12 / cardsPerRow;

        // Usa 90% da tela para o grid, deixando 5% de margem em cada lado
        const availableWidth = canvasWidth * 0.9;
        const availableHeight = canvasHeight * 0.75;

        // Calcula o tamanho do card, mantendo a proporção 2:3 (largura:altura)
        const cardAspectRatio = 2 / 3;
        let cardWidth = availableWidth / cardsPerRow;
        let cardHeight = cardWidth / cardAspectRatio;

        if (cardHeight * numRows > availableHeight) {
            cardHeight = availableHeight / numRows;
            cardWidth = cardHeight * cardAspectRatio;
        }

        const padding = cardWidth * 0.15; // O espaçamento será 15% da largura do card
        const gridWidth = (cardsPerRow * (cardWidth + padding)) - padding;
        const gridHeight = (numRows * (cardHeight + padding)) - padding;

        this.layout = {
            cardsPerRow, numRows, cardWidth, cardHeight, padding,
            offsetX: (canvasWidth - gridWidth) / 2,
            offsetY: (canvasHeight - gridHeight) / 2,
        };
    }
    resize(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.calculateLayout(canvasWidth, canvasHeight);

        this.deck.forEach((card, index) => {
            const layout = this.layout;
            const row = Math.floor(index / layout.cardsPerRow);
            const col = index % layout.cardsPerRow;

            card.x = layout.offsetX + col * (layout.cardWidth + layout.padding);
            card.y = layout.offsetY + row * (layout.cardHeight + layout.padding);
            card.width = layout.cardWidth;
            card.height = layout.cardHeight;
        });
    }



    imageLoaded() {
        this.imagesLoaded++;
    }

    handleGameInput(x, y) {

        if (this.flippedCards.length === 2) {
            return;
        }

        for (const card of this.deck) {
            if (!card.isFlipped && !card.isMatched &&
                x >= card.x && x <= card.x + card.width &&
                y >= card.y && y <= card.y + card.height) {

                card.isFlipped = true;
                this.flippedCards.push(card);
                break;
            }
        }

        // If two cards are now flipped, check for a match
        if (this.flippedCards.length === 2) {
            setTimeout(() => this.checkMatch(), 1000);
        }
    }


    checkMatch() {
        const [card1, card2] = this.flippedCards;

        if (card1.pairId === card2.pairId) {

            card1.isMatched = true;
            card2.isMatched = true;

            const allMatched = this.deck.every(card => card.isMatched);
            if (allMatched) {
                // Notifica o main.js que o jogo acabou
                setTimeout(() => this.onGameOver(), 500);
            }

        } else {

            card1.isFlipped = false;
            card2.isFlipped = false;
        }

        this.flippedCards = [];
    }

    draw(ctx) {
        if (this.imagesLoaded < this.totalImages) return;

        this.deck.forEach(card => {
            ctx.save();
            if (card.isMatched) {
                ctx.globalAlpha = 0.5;
            }

            if (card.isFlipped || card.isMatched) {
                ctx.drawImage(this.cardImages[card.imageFile], card.x, card.y, card.width, card.height);
            } else {
                ctx.drawImage(this.backImage, card.x, card.y, card.width, card.height);
            }
            ctx.restore();
        });
    }

}