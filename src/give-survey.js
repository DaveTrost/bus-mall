


const instructionsShowHide = document.getElementById('instructions-show-hide');
const startReset = document.getElementById('start-reset');
const surveyDrawer = document.getElementById('survey-drawer');
const resultsDrawer = document.getElementById('results-drawer');
const choice1 = document.getElementById('choice-1');
const choice2 = document.getElementById('choice-2');
const choice3 = document.getElementById('choice-3');

resultsDrawer.classList.add('hidden');

startReset.addEventListener('click', () => {
    surveyDrawer.classList.remove('hidden');
    instructionsShowHide.checked = false;
});

choice1.addEventListener('click', () => userChoice('choice1'));
choice2.addEventListener('click', () => userChoice('choice2'));
choice3.addEventListener('click', () => userChoice('choice3'));

function userChoice(choicePosition) {
    console.log(choicePosition);
    // choice1.classList.remove('shrink-out');
    // choice2.classList.remove('shrink-out');
    // choice3.classList.remove('shrink-out');

    // choice1.classList.add('shrink-out');
    // choice2.classList.add('shrink-out');
    // choice3.classList.add('shrink-out');

    // choice1.querySelector('img').src = 'assets/wine-glass.jpg';
}