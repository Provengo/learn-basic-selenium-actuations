// @provengo summon selenium

const URL = "https://duckduckgo.com";

/**
 * Component repository, holds XPaths for UI elements.
 */
const COMPONENTS = {
    searchField: "//input[@id='searchbox_input']",
    submitButton: "//button[@type='submit']",
    resultsDiv: "//div[@class='results--main']"
};

// Define a Selenium session. No window is opened yet.
const seleniumSession = new SeleniumSession("user");

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
    seleniumSession.waitForVisibility(COMPONENTS.resultsDiv, 10000);
    // Assert that results were found
    seleniumSession.assertText( COMPONENTS.resultsDiv,
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