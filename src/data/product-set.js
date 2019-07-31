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
        const length = this.list.length;
        let randomSet = [];
        for(let i = length - 1; i > length - 1 - 3; i--) {
            let randomIndex = Math.floor(Math.random() * i);
            randomSet.push(this.list[randomIndex].code);
            [this.list[randomIndex], this.list[i]] = [this.list[i], this.list[randomIndex]];
        }
        return randomSet;
    }
}