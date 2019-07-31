import { products } from './products.js';
export const PRODUCTS_KEY = 'bus-mall-product-spoofs';
export const RESULTS_KEY = 'bus-mall-survey-results';

export const storage = {
    storage: window.localStorage,
    save(key, item) {
        this.storage.setItem(key, JSON.stringify(item));
    },
    get(key) {
        return JSON.parse(this.storage.getItem(key));
    },
    getProducts() {
        let productList = this.get(PRODUCTS_KEY);
        if(!productList) {
            this.save(PRODUCTS_KEY, products);
            productList = products;
        }
        return productList;
    },
    storeResults(results) {
        this.save(RESULTS_KEY, results);
    },
    getResults() {
        const results = this.get(RESULTS_KEY);
        return (results) ? results : [];
    },
};
