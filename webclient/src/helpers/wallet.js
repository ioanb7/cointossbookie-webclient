export default class Wallet {
    constructor() {
        const instance = this.constructor.instance;
        if (instance) {
            return instance;
        }

        this.constructor.instance = this;
    }

    get() {
        var fromLocalStorage = localStorage['money']
        if (parseInt(fromLocalStorage) > -1) {
            return fromLocalStorage
        }
        return localStorage['money'] = 100
    }

    set(value) {
        return localStorage['money'] = value
    }
}