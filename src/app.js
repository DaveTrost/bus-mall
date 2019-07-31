import { storage } from './data/storage.js';
import { SurveyTracker } from './data/survey-tracker.js';
import { ProductSet } from './data/product-set.js';

const instructionsShowHide = document.getElementById('instructions-show-hide');
const startRestart = document.getElementById('start-reset');
const surveyDrawer = document.getElementById('survey-drawer');
const resultsDrawer = document.getElementById('results-drawer');
const choices = document.querySelectorAll('.choice');


let surveyOperator = new SurveyTracker();
const products = storage.getProducts();
resultsDrawer.classList.add('hidden');
let displaySet = generateNonDuplicateSet(surveyOperator);
surveyOperator.addSetToHistory(displaySet);
displayChoices(surveyOperator);

startRestart.addEventListener('click', () => {
    surveyOperator = new SurveyTracker();
    surveyDrawer.classList.remove('hidden');
    resultsDrawer.classList.add('hidden');
    instructionsShowHide.checked = false;
});

choices.forEach((element) => element.addEventListener('click', (event) => handleSurveyAnswer(event)));
function handleSurveyAnswer(e) {
    const code = e.currentTarget.value;
    surveyOperator.addAnswerToResults(code);

    const choices = document.querySelectorAll('.choice');
    choices[0].disabled = true;
    choices[1].disabled = true;
    choices[2].disabled = true;

    if(surveyOperator.getNumAnswers() < 25) {
        let displaySet = generateNonDuplicateSet(surveyOperator);
        surveyOperator.addSetToHistory(displaySet);
        displayChoices(surveyOperator);
        choices[0].disabled = false;
        choices[1].disabled = false;
        choices[2].disabled = false;    
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

    for(let i = 0; i < 3; i++) {
        const element = document.getElementById('img-' + (i + 1));
        const product = storage.getProduct(currentSet[i]);
        element.src = product.image;
        element.alt = product.name;
        element.parentNode.value = product.code;
    }
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
    } while(newSet.length === 0);

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
