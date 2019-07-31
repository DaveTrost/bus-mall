import { storage } from './storage.js';

export class SurveyTracker {
    constructor() {
        this.answers = 0;
        this.answerOccurence = [];
        this.history = [];
    }


    findAnswer(code) {
        return this.answerOccurence.find((element) => element.code === code);
    }
    addAnswer(answer) {
        this.answers++;

        const currentAnswer = this.findAnswer(answer);
        if(currentAnswer) {
            currentAnswer.occurence++;
        }
        else {
            this.answerOccurence.push({ 
                code: answer, 
                occurence: 1
            });
        }
        storage.storeResults(this.answerOccurence);
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
    getAnswerOccurence(answer) {
        let occurence = 0;
        const currentAnswer = this.findAnswer(answer);
        if(currentAnswer) occurence = currentAnswer.occurence;
        return occurence;
    }
}