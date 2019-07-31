import { storage } from './data/storage.js';
import { SurveyTracker } from './data/survey-tracker.js';
import { ProductSet } from './data/product-set.js';

const surveyOperator = new SurveyTracker();
const products = storage.getProducts();

const instructionsShowHide = document.getElementById('instructions-show-hide');
const startRestart = document.getElementById('start-reset');
const surveyDrawer = document.getElementById('survey-drawer');
const resultsDrawer = document.getElementById('results-drawer');
const choices = document.querySelectorAll('.choice');


resultsDrawer.classList.add('hidden');
let displaySet = generateNonDuplicateSet(surveyOperator);
surveyOperator.addSetToHistory(displaySet);
displayChoices(surveyOperator);

startRestart.addEventListener('click', () => {
    surveyDrawer.classList.remove('hidden');
    resultsDrawer.classList.add('hidden');
    instructionsShowHide.checked = false;
});

choices.forEach((element) => element.addEventListener('click', (event) => handleSurveyAnswer(event)));
function handleSurveyAnswer(e) {
    let code = e.target.id;
    surveyOperator.addAnswerToResults(code);

    if(surveyOperator.getNumAnswers() < 25) {
        displaySet = generateNonDuplicateSet(surveyOperator);
        surveyOperator.addSetToHistory(displaySet);
        displayChoices(surveyOperator);
    }
    else {
        endSurvey();
    }
}


function endSurvey() {
    alert('We haz extracted all of your brain juice. You leave now.');
    surveyDrawer.classList.add('hidden');
    resultsDrawer.classList.remove('hidden');
}

function displayChoices(surveyOperator) {
    const currentSet = surveyOperator.getLastSetFromHistory();
    document.getElementById('img-1').src = storage.getProduct(currentSet[0]).image;
    document.getElementById('img-2').src = storage.getProduct(currentSet[1]).image;
    document.getElementById('img-3').src = storage.getProduct(currentSet[2]).image;
}


function generateNonDuplicateSet(surveyOperator) {
    const productSet = new ProductSet(products);
    
    const lastSet = surveyOperator.getLastSetFromHistory();
    if(lastSet) {
        lastSet.forEach(element => productSet.removeItemByCode(element));
    }
    
    let newSet = [];
    const history = surveyOperator.getAllHistory();
    do{
        newSet = productSet.generateRandomSetOfCodes(3);
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
    });
    return (repeatItemCount >= 2) ? true : false;
}
