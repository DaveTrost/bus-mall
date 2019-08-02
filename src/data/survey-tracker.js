import { storage } from './storage.js';

export class SurveyTracker {
    constructor() {
        this.answers = 0;
        this.answerOccurrence = [];
        this.history = [];
    }

    findAnswer(code) {
        return this.answerOccurrence.find((element) => element.code === code);
    }
    addAnswerToResults(answer) {
        this.answers++;
        
        const currentAnswer = this.findAnswer(answer);
        if(currentAnswer) {
            currentAnswer.occurrence++;
        }
        else {
            this.answerOccurrence.push({ 
                code: answer, 
                occurrence: 1
            });
        }

        const longTermResults = storage.getAnswers();
        const historicalAnswer = longTermResults.find((element) => element.code === answer);
        if(historicalAnswer) {
            historicalAnswer.occurrence++;
        }
        else {
            longTermResults.push({ 
                code: answer, 
                occurrence: 1
            });
        }
        storage.storeResults(longTermResults);
    }
    addSetToHistory(set) {
        this.history.push(set);

        const longTermHistory = storage.getHistory();
        longTermHistory.push(set);
        storage.storeHistory(longTermHistory);
    }
    getLastSetFromHistory() {
        if(this.history.length > 0) {
            return this.history[this.history.length - 1];
        }
        return null;
    }
    getAllHistory() {
        return this.history;
    }
    getNumAnswers() {
        return this.answers;
    }
    getAnswerOccurrence(answer) {
        let occurrence = 0;
        const currentAnswer = this.findAnswer(answer);
        if(currentAnswer) {
            occurrence = currentAnswer.occurrence;
        }
        return occurrence;
    }
    getItemOccurrenceFromSessionHistory(code) {
        let occurrences = 0;
        const allHistory = this.getAllHistory();
        allHistory.forEach(setElement => {
            setElement.forEach(element => {
                if(element === code) {
                    occurrences++;
                }
            });
        });
        return occurrences;
    }
}