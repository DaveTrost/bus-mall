import { storage } from './data/storage.js';
import { SurveyTracker } from './data/survey-tracker.js';
import { ProductSet } from './data/product-set.js';

const surveyOperator = new SurveyTracker();
const products = storage.getProducts();
const productSet = new ProductSet(products);

const instructionsShowHide = document.getElementById('instructions-show-hide');
const startReset = document.getElementById('start-reset');
const surveyDrawer = document.getElementById('survey-drawer');
const resultsDrawer = document.getElementById('results-drawer');
const choices = document.querySelectorAll('.choice');

// initialize the app
resultsDrawer.classList.add('hidden');

// Start survey
startReset.addEventListener('click', () => {
    surveyDrawer.classList.remove('hidden');
    resultsDrawer.classList.add('hidden');
    instructionsShowHide.checked = false;
});

// Enable choices buttons
choices.forEach((element) => element.addEventListener('click', (event) => handleSurveyAnswer(event)));

productSet.removeItemByCode('unicorn');

let newSet = ['bathroom', 'shark', 'pet-sweep'];
let historySet = ['bathroom', 'sweep', 'icon'];
console.log(testSetsForPairEquivalence(newSet, historySet));


let displaySet = generateNonDuplicateSet(surveyOperator);
surveyOperator.addSetToHistory(displaySet);
console.log(displaySet);

displaySet = generateNonDuplicateSet(surveyOperator);
surveyOperator.addSetToHistory(displaySet);
console.log(displaySet);

displaySet = generateNonDuplicateSet(surveyOperator);
surveyOperator.addSetToHistory(displaySet);
console.log(displaySet);

displaySet = generateNonDuplicateSet(surveyOperator);
surveyOperator.addSetToHistory(displaySet);
console.log(displaySet);

displaySet = generateNonDuplicateSet(surveyOperator);
surveyOperator.addSetToHistory(displaySet);
console.log(displaySet);


function generateNonDuplicateSet(surveyOperator) {
    const productSet = new ProductSet(products);
    
    const lastSet = surveyOperator.getLastSetFromHistory();
    if(lastSet) lastSet.forEach(element => productSet.removeItemByCode(element));
    
    let newSet = [];
    const history = surveyOperator.getAllHistory();
    do{
        newSet = productSet.generateRandomSetOfCodes();
        history.forEach((historyElement) => {
            if(testSetsForPairEquivalence(newSet, historyElement)) {
                newSet = [];
            }
        });
    } while(!newSet);

    return newSet;
}

function testSetsForPairEquivalence(set1, set2) {
    let repeatItemCount = 0;
    set1.forEach((elementFromSet1) => {
        set2.forEach((elementFromSet2) => {
            if(elementFromSet1 === elementFromSet2) {
                repeatItemCount++;
            }
        });
        console.log(repeatItemCount);
    });

    return (repeatItemCount >= 2) ? true : false;
}
// function testSetsForTotalEquivalence(set1, set2) {
//     set1.forEach((elementFromSet1) => {
//         let foundAMatch = false;    
//         foundAMatch = foundAMatch || set2.forEach((elementFromSet2) => {
//             return (elementFromSet1 === elementFromSet2);    
//         });
//         if(!foundAMatch) {
//             return true;    
//         }
//     });
//      return false;
// }


// handle survey answer
function handleSurveyAnswer(e) {
    let code = e.target.id;
    surveyOperator.addAnswer(code);

    console.log(surveyOperator.getNumAnswers());
    console.log(`code ${code} has been selected this many times: ` + surveyOperator.getAnswerOccurence(code));
}