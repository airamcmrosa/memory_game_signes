import { Menu } from './menu.js';

function runMenuTests() {
    console.log("--- Running Menu Logic Tests ---");

    // Test Case 1: Menu should create a playable button with position and size.
    try {
        // The Menu will need canvas dimensions to calculate button position.
        const mockCanvas = { width: 800, height: 600 };
        const menu = new Menu(mockCanvas.width, mockCanvas.height);

        const button = menu.playButton;
        const properties = ['x', 'y', 'width', 'height'];
        let allPropertiesExist = true;

        console.assert(typeof button === 'object' && button !== null, `Test Failed: playButton should be an object.`);

        for (const prop of properties) {
            const hasProperty = button.hasOwnProperty(prop);
            const isNumber = typeof button[prop] === 'number';

            console.assert(hasProperty, `Test Failed: playButton should have a '${prop}' property.`);
            console.assert(isNumber, `Test Failed: playButton property '${prop}' should be a number.`);

            if (!hasProperty || !isNumber) {
                allPropertiesExist = false;
            }
        }

        if (allPropertiesExist) {
            console.log("✅ Test Passed: Menu button initialization.");
        }
    } catch (e) {
        console.error("❌ Test Failed: Menu button initialization.", e);
    }

    console.log("--- All Menu Tests Finished ---");
}

runMenuTests();