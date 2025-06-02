import { Background } from './background.js';

function runBackgroundTests() {
    console.log("--- Running Background Logic Tests ---");

    // Test Case 1: Background should initialize with a set number of stars.
    try {
        const starCount = 100;
        const background = new Background(starCount);
        const expectedStarCount = starCount;
        const actualStarCount = background.stars.length;

        console.assert(actualStarCount === expectedStarCount, `Test Failed: Star count should be ${expectedStarCount}, but was ${actualStarCount}`);

        if (actualStarCount === expectedStarCount) {
            console.log("✅ Test Passed: Background initialization.");
        }
    } catch (e) {
        console.error("❌ Test Failed: Background initialization.", e);
    }

    // We will add more tests here later.

    console.log("--- All Background Tests Finished ---");
}

runBackgroundTests();