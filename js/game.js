export class Game {
    constructor() {
        this.cardImages = {};
        this.backImage = new Image();
        this.backImage.src = 'images/back.png'; //

        this.backImage.onload = () => {
            this.imagesLoaded = true;
        }

        const characters = [
            { signe: "Bélier", caractéristique: "susceptible" },
            { signe: "Taureau", caractéristique: "déterminé" },
            { signe: "Gémeaux", caractéristique: "curieux" },
            { signe: "Cancer", caractéristique: "émotif" },
            { signe: "Lion", caractéristique: "charismatique" },
            { signe: "Vierge", caractéristique: "perfectionniste" },
            { signe: "Balance", caractéristique: "équilibré" },
            { signe: "Scorpion", caractéristique: "passionné" },
            { signe: "Sagittaire", caractéristique: "aventurier" },
            { signe: "Capricorne", caractéristique: "ambitieux" },
            { signe: "Verseau", caractéristique: "indépendant" },
            { signe: "Poissons", caractéristique: "imaginatif" }
        ];

        // --- Deck Creation Logic ---

        // 1. Shuffle the full list of characters to get a random set each time.
        const shuffledCharacters = characters.sort(() => 0.5 - Math.random());

        // 2. Select the first 6 characters for this game.
        const selectedCharacters = shuffledCharacters.slice(0, 6);

        const cardPairs = [];
        // 3. Create card pairs from the selected characters.
        selectedCharacters.forEach((character, index) => {
            // Add new state properties to each card object
            cardPairs.push({
                type: 'signe', value: character.signe, pairId: index,
                isFlipped: false, isMatched: false
            });
            cardPairs.push({
                type: 'caracteristique', value: character.caractéristique, pairId: index,
                isFlipped: false, isMatched: false
            });
        });

        // 4. Shuffle the final 12-card deck and assign it to the instance.
        this.deck = cardPairs.sort(() => 0.5 - Math.random());

        // --- NEW PROPERTIES ---
        this.flippedCards = [];
        this.cardImages = {};
        this.imagesLoaded = 0;
        this.totalImages = 13; // 12 card fronts + 1 back

        this.backImage = new Image();
        this.backImage.src = 'images/back.png';
        this.backImage.onload = () => this.imageLoaded();

        this.deck.forEach(card => {
            this.cardImages[card.value] = new Image();
            this.cardImages[card.value].src = `images/${card.value}.png`;
            this.cardImages[card.value].onload = () => this.imageLoaded();
        });
    }

    imageLoaded() {
        this.imagesLoaded++;
    }

    // --- NEW METHOD: To handle clicks passed from main.js ---
    handleGameClick(x, y) {
        // Don't allow clicking more cards if two are already flipped
        if (this.flippedCards.length === 2) {
            return;
        }

        for (const card of this.deck) {
            if (!card.isFlipped && !card.isMatched &&
                x >= card.x && x <= card.x + card.width &&
                y >= card.y && y <= card.y + card.height) {

                card.isFlipped = true;
                this.flippedCards.push(card);
                break; // Stop after finding the clicked card
            }
        }

        // If two cards are now flipped, check for a match
        if (this.flippedCards.length === 2) {
            setTimeout(() => this.checkMatch(), 1000);
        }
    }

    // --- NEW METHOD: To check for matches ---
    checkMatch() {
        const [card1, card2] = this.flippedCards;

        if (card1.pairId === card2.pairId) {
            // It's a match!
            card1.isMatched = true;
            card2.isMatched = true;
        } else {
            // Not a match, flip them back
            card1.isFlipped = false;
            card2.isFlipped = false;
        }

        // Clear the flipped cards array for the next turn
        this.flippedCards = [];
    }

    // --- UPDATED draw METHOD ---
    draw(ctx, canvasWidth, canvasHeight) {
        if (this.imagesLoaded < this.totalImages) return;

        const cardsPerRow = 6;
        const cardWidth = 100;
        const cardHeight = 150;
        const padding = 20;
        const totalGridWidth = (cardsPerRow * (cardWidth + padding)) - padding;
        const offsetX = (canvasWidth - totalGridWidth) / 2;
        const offsetY = (canvasHeight - (2 * cardHeight + padding)) / 2;

        this.deck.forEach((card, index) => {
            const row = Math.floor(index / cardsPerRow);
            const col = index % cardsPerRow;
            card.x = offsetX + col * (cardWidth + padding);
            card.y = offsetY + row * (cardHeight + padding);
            card.width = cardWidth;
            card.height = cardHeight;

            // Save the context state
            ctx.save();

            // If a card is matched, draw it slightly faded
            if (card.isMatched) {
                ctx.globalAlpha = 0.5;
            }

            // Draw the card front or back based on its state
            if (card.isFlipped || card.isMatched) {
                ctx.drawImage(this.cardImages[card.value], card.x, card.y, card.width, card.height);
            } else {
                ctx.drawImage(this.backImage, card.x, card.y, card.width, card.height);
            }

            // Restore the context state
            ctx.restore();
        });
    }
}