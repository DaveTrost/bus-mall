import { storage } from '../src/data/storage.js';
import { products } from '../src/data/products.js';

const test = QUnit.test;

QUnit.module('Store Tests');

storage.storage = window.sessionStorage;

QUnit.testStart(() => {
    storage.storage.clear();
});

test('test get and save', assert => {
    const key = 'testData';
    const item = { code: 'product master' };
    storage.save(key, item);
    assert.deepEqual(storage.get(key), item);
});

test('test bootstrapping works in getProducts', assert => {
    assert.deepEqual(storage.getProducts(), products);
});

test('test get results when results is empty', assert => {
    assert.deepEqual(storage.getResults(), []);
});

test('test store and get results', assert => {
    const expected = { 
        code: 'test-code', 
        occurrence: 1
    };
    storage.storeResults(expected);
    assert.deepEqual(storage.getResults(), expected);
});

