// @provengo summon selenium

const URL = "https://duckduckgo.com";

// Component repository, holds XPaths for UI elements.
const COMPONENTS = {
    searchField: "//input[@id='searchbox_input']",
    submitButton: "//button[@type='submit']",
    resultsDiv: "//div[@class='results--main']"
};

// Define a Selenium session. Nothing is opened yet.
const seleniumSession = new SeleniumSession("s1");

bthread("basic search", function(){

    // decide what we search for
    let searchTerm = choose("pizza","banana","strawberry");
    
    //// Go to search screen
    seleniumSession.start(URL);
    
    // Enter search term
    seleniumSession.writeText(COMPONENTS.searchField, searchTerm);
    // Search!
    seleniumSession.click(COMPONENTS.submitButton);

    //// moving to the results screen
    // Wait for results for up to 10 seconds
    seleniumSession.waitForVisibility(COMPONENTS.resultsDiv, 10);
    // Assert that results were found
    seleniumSession.assertText( COMPONENTS.resultsDiv,
        searchTerm,
        TextAssertions.modifiers.IgnoreCase, 
        TextAssertions.modifiers.Contains
    );
    
    // Intentionally fail the test 1 out of 4 runs.
    // Added to so the logs have more to show.
    if ( choose("ok","fine","pass","fail") === "fail" ) {
        seleniumSession.waitForVisibility("//notThere");
    }
});