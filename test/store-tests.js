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
