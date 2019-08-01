# bus-mall development plan

## Build User Interface

- import all image files and testing setup files
- build a template for 3 images
- build a template for the results that will display after 25 choices are made

## Drive user interface from JS

- Start/Restart button kicks off the survey loop

- survey loop
  - Init
    - show survey section
    - hide results section
    - disable the start/restart button
  - Loop until 25 choices have been made
    - generate a new set of 3 images
      - build a temporary image list that excludes the last set of images used
      - start a loop
        - get a random set of 3 images from the temporary image list
        - for each set in .setHistory[], check if any 2 products from the current random set have been included in a single previous set.
      - loop until a set is created that meets the requirement
    - display the new set of 3 images
    - wait for click event
    - update data
      - increment numChoices - DONE
      - increment the occurrences for this choice - DONE
      - set the .lastSet variable
      - add .lastSet to the history of sets shown (.setHistory[])
    - continue the loop

- End of Survey
  - hide the survey section
  - show the results section
  - rename the Start button to Restart and enable the button
  - generate results table
  - display the results table

### data structures

- Class: ProductSet - this is used for storing all the valid products from the master list. It has the following methods:
  - get initialized from a given list (constructor) ... the master list
  - remove a set of 3 items
  - generate a random set of 3 images

- Class: SurveyTracker - this is used for tracking all the data about the survey.  
  - history of sets
  - number of sets displayed
  - number of times any given product has been selected
  - checkForEquivalenceToHistory - checks if an incoming set shares 2 or more products with a set that was previously displayed

- Object: storage - this saves data to and retrieves it from localStorage
  - The store bootstraps itself from input data
  - methods to save results to localStorage and retrieve results from localStorage

### to-do

- cleanup CSS for results header - DONE
- long term history vs. session history - DONE
  - clear the single session variables on start and re-start - DONE
- add alt text to images - DONE
- investigate buttons occasionally not working - DONE
- parse history to get results of how many times an image was shown - DONE
  - single session
  - lifetime sessions
- Refactor
- get Travis to pass
