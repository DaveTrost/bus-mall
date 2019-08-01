import { storage } from './data/storage.js';
import { SurveyTracker } from './data/survey-tracker.js';
import { ProductSet } from './data/product-set.js';
import { Sound } from './data/sound.js';
export const SURVEY_LENGTH = 25;
export const SURVEY_SETSIZE = 3;

/* Music by Eric Matyas
   www.soundimage.org */
const surveyMusic = new Sound('http://soundimage.org/wp-content/uploads/2015/08/My-Fat-Cat.mp3');
const endSurveyMusic = new Sound('http://soundimage.org/wp-content/uploads/2016/04/PowerRez7.mp3');

const products = storage.getProducts();
let surveyOperator = new SurveyTracker();
const instructionsShowHide = document.getElementById('instructions-show-hide');
const startRestart = document.getElementById('start-reset');
const surveyDrawer = document.getElementById('survey-drawer');
const resultsDrawer = document.getElementById('results-drawer');
const choices = document.querySelectorAll('.choice');


initializePage();

startRestart.addEventListener('click', () => {
    goSurvey(); 
});

choices.forEach((element) => element.addEventListener('click', (event) => {
    let continueSurvey = handleNewAnswer(event);

    if(!continueSurvey) {
        endSurvey();
        drawCharts();
    }
}));



function initializePage() {
    let displaySet = generateNonDuplicateSet(surveyOperator);
    surveyOperator.addSetToHistory(displaySet);
    displayChoices(surveyOperator);
    
    resultsDrawer.classList.add('hidden');
}

function goSurvey() {
    surveyOperator = new SurveyTracker();
    surveyMusic.loop();

    surveyDrawer.classList.remove('hidden');
    resultsDrawer.classList.add('hidden');
    instructionsShowHide.checked = false;
    disableChoicesButtons(false);
}

function handleNewAnswer(e) {
    const userSelectedCode = e.currentTarget.value;
    surveyOperator.addAnswerToResults(userSelectedCode);

    disableChoicesButtons(true);
    if(surveyOperator.getNumAnswers() < SURVEY_LENGTH) {
        let displaySet = generateNonDuplicateSet(surveyOperator);
        surveyOperator.addSetToHistory(displaySet);
        displayChoices(surveyOperator);
        disableChoicesButtons(false);
        return true;
    }
    return false;
}

function endSurvey() {
    surveyDrawer.classList.add('hidden');
    resultsDrawer.classList.remove('hidden');
    surveyMusic.stop();
    endSurveyMusic.play();
}


function displayChoices(surveyOperator) {
    const currentSet = surveyOperator.getLastSetFromHistory();

    for(let i = 0; i < SURVEY_SETSIZE; i++) {
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
        newSet = productSet.generateRandomSetOfCodes(SURVEY_SETSIZE);
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


function drawCharts() {
    const products = storage.getProducts();
    let productLabels = [];
    let sessionSelectionsDataPoints = [];
    let sessionOccurenceDataPoints = [];
    let historicalSelectionsDataPoints = [];
    let numChoicesPoints = [];

    products.forEach(element => {
        productLabels.push(element.name);
        sessionSelectionsDataPoints.push(surveyOperator.getAnswerOccurrence(element.code));
        sessionOccurenceDataPoints.push(surveyOperator.getItemOccurrenceFromSetHistory(element.code));
        numChoicesPoints.push(surveyOperator.getNumAnswers());
        historicalSelectionsDataPoints.push(storage.getAnswerOccurrence(element.code));
    });
    
    drawChartWithSessionData(productLabels, sessionSelectionsDataPoints, sessionOccurenceDataPoints);
    drawChartWithHistoricalData(productLabels, historicalSelectionsDataPoints);
}

function drawChartWithSessionData(productLabels, sessionSelectionsDataPoints, sessionOccurenceDataPoints) {
    const img1 = new Image();
    img1.src = '../assets/vomit.png';
    const img2 = new Image();
    img2.src = '../assets/vomit-splat.png';
    img1.onload = () => img2.onload = () => {
        const sessionCtx = document.getElementById('choices-chart-session').getContext('2d');
        const fillPattern1 = sessionCtx.createPattern(img1, 'repeat');
        const fillPattern2 = sessionCtx.createPattern(img2, 'repeat');
        /* eslint-disable-next-line */
        let chart = new Chart(sessionCtx, {
            type: 'line',
            data: {
                labels: productLabels,
                datasets: [{
                    label: 'Number of User Selections',
                    backgroundColor: fillPattern2,
                    borderColor: 'rgb(255, 99, 255)',
                    borderWidth: 5,
                    data: sessionSelectionsDataPoints
                }, {
                    label: 'Number of Times Shown',
                    backgroundColor: fillPattern1,
                    borderColor: 'rgb(128, 172, 53)',
                    borderWidth: 8,
                    data: sessionOccurenceDataPoints
                }]
            },
            options: {
                title: {
                    text: 'Survey Results (btw your taste is AWFUL)',
                    display: true,
                    fontSize: '35',
                    fontColor: '#8EB1C7'
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    };
}

function drawChartWithHistoricalData(productLabels, historicalSelectionsDataPoints) {
    const historicalCtx = document.getElementById('frequency-chart-session').getContext('2d');
    /* eslint-disable-next-line */
    let chart = new Chart(historicalCtx, {
        type: 'pie',
        data: {
            labels: productLabels,
            datasets: [{
                label: 'Number of Times Selected (all-time)',
                data: historicalSelectionsDataPoints,
                borderColor: '#555',
                backgroundColor: [
                    '#80F31F',
                    '#A5DE0B',
                    '#C7C101',
                    '#E39E03',
                    '#F6780F',
                    '#FE5326',
                    '#FB3244',
                    '#ED1868',
                    '#D5078E',
                    '#B601B3',
                    '#9106D3',
                    '#6B16EC',
                    '#472FFA',
                    '#2850FE',
                    '#1175F7',
                    '#039BE5',
                    '#01BECA',
                    '#0ADCA8',
                    '#1DF283',
                    '#3AFD5D',
                    '#5CFD3A',
                    '#82F21E',
                    '#A7DD0A',
                    '#C9BF01',
                    '#E49C03'
                ]
            }]
        },
        options: {
            title: {
                text: 'All-time selections (looks like a unicorn turd, doesn\'t it?)',
                display: true,
                fontSize: '35',
                fontColor: '#8EB1C7'
            },
            legend: {
                position: 'left'
            },
            responsive: true
        }
    });
}

function disableChoicesButtons(disable) {
    choices[0].disabled = disable;
    choices[1].disabled = disable;
    choices[2].disabled = disable;
}
