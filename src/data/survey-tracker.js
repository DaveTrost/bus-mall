import { storage } from './storage.js';

export class SurveyTracker {
    constructor() {
        this.answers = 0;
        this.answeroccurrence = [];
        this.history = [];
    }

    findAnswer(code) {
        return this.answeroccurrence.find((element) => element.code === code);
    }
    addAnswerToResults(answer) {
        this.answers++;
        
        const currentAnswer = this.findAnswer(answer);
        if(currentAnswer) {
            currentAnswer.occurrence++;
        }
        else {
            this.answeroccurrence.push({ 
                code: answer, 
                occurrence: 1
            });
        }
        storage.storeResults(this.answeroccurrence);
    }
    addSetToHistory(set) {
        this.history.push(set);
    }
    getLastSetFromHistory() {
        return (this.history.length > 0) ? this.history[this.history.length - 1] : null;
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
        if(currentAnswer) occurrence = currentAnswer.occurrence;
        return occurrence;
    }
}