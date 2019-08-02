import { ProductSet } from '../src/data/product-set.js';
import { storage } from '../src/data/storage.js';

const test = QUnit.test;

QUnit.module('ProductSet Tests');

storage.storage = window.sessionStorage;

QUnit.testStart(() => {
    storage.storage.clear();
});

test('test bootstrapping to fill array', assert => {
    const products = storage.getProducts();
    const productSet = new ProductSet(products);

    assert.deepEqual(productSet.list, products);
});

test('test remove product by code', assert => {
    const productSet = new ProductSet([{
        code: 'bag',
        name: 'Star Wars Suitcase',
        image: './assets/bag.jpg'
    }]);
    productSet.removeItemByCode('bag');
    assert.deepEqual(productSet.list, []);
});

test('test generate random codes', assert => {
    const products = storage.getProducts();
    const productSet = new ProductSet(products);
    const unexpected = products.slice(0, 3);

    const attempts = 1000;
    let countUnexpectedResults = 0;
    for(let i = 0; i < attempts; i++){
        if(deepEqual(productSet.generateRandomSetOfCodes(3), unexpected)) {
            countUnexpectedResults++;
        }
    }
    assert.equal((countUnexpectedResults < attempts * 0.1), true);
});

// A handy deep equal function from SO:
// https://stackoverflow.com/questions/201183/how-to-determine-equality-for-two-javascript-objects/16788517#16788517
function deepEqual(x, y) {
    const ok = Object.keys, tx = typeof x, ty = typeof y;
    return x && y && tx === 'object' && tx === ty ? (
        ok(x).length === ok(y).length &&
        ok(x).every(key => deepEqual(x[key], y[key]))
    ) : (x === y);
}
