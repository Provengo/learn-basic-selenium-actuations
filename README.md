# SeleniumBasics

A Provnego project for demonstrating the basics of Selenium-based actuation.

## Important Files

* [SimpleSearch.js](SimpleSearch.js) A script for testing a web search engine.
* [provengo.yml](provengo.yml) Configuration file.

## Useful Commands

*⚠️ NOTE:* In the below listings, we assume that `provengo.bat` is in the path, and that `selenium-basics` is the path to this directory (i.e. run this code from the directory that directly contains `selenium-basics`). For UNIX systems, change `provengo.bat` to `provengo.sh`.

*⚠️ NOTE:* [Selenium server (grid)](https://www.selenium.dev/downloads/), Chrome, and the chrome selenium driver need to be installed for this. For the Chrome driver, see the ["Browsers" section](https://www.selenium.dev/downloads/). You'll have to scroll down quite a bit.


### Randomized Dry Run 

Perform a single run through the specification, with no actuations. Good for "Sanity checks", i.e. to see examples of what can happen. Does not require any Selenium server.

    provengo.bat run --dry-run selenium-basics

### Randomized Run 

Perform a single run through the specification.  Selenium server needs to be running for this.

    provengo.bat run selenium-basics

Running with the browser visible

    provengo.bat run --show-sessions selenium-basics

Running with delayed actions. Units are milliseconds, so the `5000` in the below snippet means "5 seconds".

    provengo.bat run --action-delay 5000 selenium-basics

The above flags can of course be used together.

### Visualize the Spec

Draw the specification in a PDF file.

    provengo.bat analyze -f pdf selenium-basics


⚠️ NOTE: This requires [Graphviz](http://graphviz.org) to be installed.


### Sample Runs from the Spec

Sample 10 scenarios into a file. The scenarios are stored in a file called `samples.json` (this can be changed using the `-o`/`--output-file` switch).

    provengo.bat sample --delete-previous --sample-size 10 selenium-basics


### Run the Sample as a Suite

Run the sampled tests as a single test suite.

    provengo.bat run --run-ensemble --ensemble-file samples.json samples.json selenium-basics

> Soon, the `--run-ensemble --ensemble-file` part will be replaced with `--run-source`.

### Create Run Logs

Creates a report of the tests run, in the form of a static HTML site.

    provengo.bat report selenium-basics


## NOTES

* This is a very basic sample project that does not cover all system features. For example, we left suite optimizations and DSLs out.
* To gain more visibility info what `provengo` is doing, invoke it with the `--verbose` flag between `provengo` and the verb, like so: 
```
    provengo.bat --verbose run selenium-sample
```