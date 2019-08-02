import { SurveyTracker } from '../src/data/survey-tracker.js';
import { storage } from '../src/data/storage.js';

const test = QUnit.test;

QUnit.module('ProductSet Tests');

storage.storage = window.sessionStorage;

test('test putting answers into the results list and getting their occurrences', assert => {
    const surveyOperator = new SurveyTracker();

    let code1 = 'carrot';
    let code2 = 'apple';
    let code3 = 'orange';
    surveyOperator.addAnswerToResults(code1);
    surveyOperator.addAnswerToResults(code2);
    surveyOperator.addAnswerToResults(code2);
    surveyOperator.addAnswerToResults(code3);

    assert.equal(surveyOperator.getAnswerOccurrence(code1), 1);
    assert.equal(surveyOperator.getAnswerOccurrence(code2), 2);
    code3 = 'banana';
    assert.equal(surveyOperator.getAnswerOccurrence(code3), 0);
});

test('test increment answers count', assert => {
    const surveyOperator = new SurveyTracker();

    let code = 'carrot';
    surveyOperator.addAnswerToResults(code);
    code = 'apple';
    surveyOperator.addAnswerToResults(code);
    code = 'orange';
    surveyOperator.addAnswerToResults(code);

    assert.equal(surveyOperator.getNumAnswers(), 3);
});

test('test roundtripping a set into history', assert => {
    const surveyOperator = new SurveyTracker();

    let set = [
        'carrot',
        'peach',
        'nectarine'
    ];
    surveyOperator.addSetToHistory(set);
    
    assert.deepEqual(surveyOperator.getLastSetFromHistory(), set);
    assert.deepEqual(surveyOperator.getAllHistory(), [set]);
});

test('test sending multiple sets into the history', assert => {
    const surveyOperator = new SurveyTracker();

    let expected = [[
        'carrot',
        'peach',
        'nectarine'
    ], [
        'grape',
        'lime',
        'pluot'
    ]];
    surveyOperator.addSetToHistory(expected[0]);
    surveyOperator.addSetToHistory(expected[1]);
    
    assert.deepEqual(surveyOperator.getAllHistory(), expected);
});
