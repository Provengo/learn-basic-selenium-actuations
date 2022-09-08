// @provengo summon selenium

const URL = "https://ecosia.org";

/**
 * Component repository, holds XPaths for UI elements.
 */
const COMPONENTS = {
    searchField:    "//input[@name='q']",
    submitButton:   "//button[@type='submit']",
    resultsSection: "//section[@data-test-id='mainline']"
};

// Define a Selenium session. No window is opened yet.
const seleniumSession = new SeleniumSession("user");

/**
 * "Main" test scenario: Open a browser window, types a search term, and 
 * asserts that pages containing that term were found.
 */
bthread("basic search", function(){
    // Go to search screen
    seleniumSession.start(URL);
    
    // decide what we search for (this splits the scenario into 3 scenarios)
    let searchTerm = choose("pizza","banana","strawberry");
    
    // Wait up to 10 seconds for the target component to be visible.
    seleniumSession.waitForVisibility(COMPONENTS.searchField, 10000);
    
    // Enter search term
    seleniumSession.writeText(COMPONENTS.searchField, searchTerm);
    // Search!
    seleniumSession.click(COMPONENTS.submitButton);

    //// moving to the results screen
    // Wait for results for up to 10 seconds
    seleniumSession.waitForVisibility(COMPONENTS.resultsSection, 10000);
    // Assert that results were found
    seleniumSession.assertText( COMPONENTS.resultsSection,
        searchTerm,
        TextAssertions.modifiers.IgnoreCase, 
        TextAssertions.modifiers.Contains
    );
    
    // Intentionally fail the test 1 out of 4 runs.
    // Added to make the logs more interesting.
    if ( choose("ok","fine","pass","fail") === "fail" ) {
        seleniumSession.waitForVisibility("//notThere");
    }
});

/**
 * Addition: if we chose to search for "strawberry",
 * don't test the failure scenario.
 */
bthread("Don't fail after strawberry", function(){
    waitFor(choiceEvent("strawberry"));
    block(choiceEvent("fail"));
});