export class ProductSet {
    constructor(productList) {
        this.list = productList.slice();
    }
    removeItemByCode(code) {
        const elementIndex = this.list.findIndex((element) => element.code === code);
        if(elementIndex > -1) {
            this.list.splice(elementIndex, 1);
        }
    }
    generateRandomSetOfCodes() {
        let index = this.list.length;
        let randomSet = [];

        // The following method for a Fisher-Yates shuffle comes from SO:
        // https://stackoverflow.com/questions/18806210/generating-non-repeating-random-numbers-in-js
        while(index--) {
            let randomIndex = Math.floor(Math.random() * (index + 1));
            randomSet.push(this.list[randomIndex].code);

            // Got this method for destructuring assignment array matching from:
            // https://medium.com/better-programming/how-swap-two-values-without-temporary-variables-using-javascript-8bb28f96b5f6
            [this.list[randomIndex], this.list[index]] = [this.list[index], this.list[randomIndex]];    
        }
        return randomSet;

        // for(let i = length - 1; i > length - 1 - 3; i--) {
        //     let randomIndex = Math.floor(Math.random() * i);
        //     randomSet.push(this.list[randomIndex].code);
        //     // Got this method for destructuring assignment array matching from:
        //     // https://medium.com/better-programming/how-swap-two-values-without-temporary-variables-using-javascript-8bb28f96b5f6
        //     [this.list[randomIndex], this.list[i]] = [this.list[i], this.list[randomIndex]];
        // }
    }
}