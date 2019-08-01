import { products } from './products.js';
export const PRODUCTS_KEY = 'bus-mall-product-spoofs';
export const RESULTS_KEY = 'bus-mall-survey-results';
export const HISTORY_KEY = 'bus-mall-history-of-sets-displayed';

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
    findElement(elements, code) {
        return elements.find((element) => element.code === code);
    },
    getProduct(code) {
        const productList = this.getProducts();
        return this.findElement(productList, code);
    },
    findElementByImage(elements, img) {
        return elements.find((element) => element.image === img);
    },
    getProductByImage(img) {
        const productList = this.getProducts();
        return this.findElement(productList, img);
    },
    storeResults(results) {
        this.save(RESULTS_KEY, results);
    },
    getAnswers() {
        const results = this.get(RESULTS_KEY);
        return (results) ? results : [];
    },
    getAnswerOccurrence(answer) {
        const results = this.getAnswers();
        let occurrences = 0;
        const element = this.findElement(results, answer);
        if(element) {
            occurrences = element.occurrence;
        }
        return occurrences;
    },
    storeHistory(history) {
        this.save(HISTORY_KEY, history);
    },
    getHistory() {
        const history = this.get(HISTORY_KEY);
        return (history) ? history : [];
    }
};
