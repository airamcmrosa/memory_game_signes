// We need to import the Game class to test it.
// Note: For this to work in a browser, you'll run this from an HTML file
// that treats scripts as modules. We'll set that up next.
import { Game } from './game.js';

function runTests() {
    console.log("--- Running Game Logic Tests ---");

    // Test Case 1: Game should create a deck of 12 cards.
    try {
        const game = new Game(); // We don't need a real ctx for this test
        const expectedDeckSize = 12;
        const actualDeckSize = game.deck.length;

        console.assert(actualDeckSize === expectedDeckSize, `Test Failed: Deck size should be ${expectedDeckSize}, but was ${actualDeckSize}`);
        if (actualDeckSize === expectedDeckSize) {
            console.log("✅ Test Passed: Deck creation.");
        }
    } catch (e) {
        console.error("❌ Test Failed: Deck creation.", e);
    }

    console.log("--- All Tests Finished ---");
}

runTests();