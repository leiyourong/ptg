/* eslint-disable */
// var class2type = {
//     "[object Boolean]": "boolean",
//     "[object Number]": "number",
//     "[object String]": "string",
//     "[object Function]": "function",
//     "[object Array]": "array",
//     "[object Date]": "date",
//     "[object RegExp]": "regexp",
//     "[object Object]": "object",
//     "[object Error]": "error",
//     "[object Symbol]": "symbol"
// }

class Promise {
    result = ''
    
    STATE = {
        pending: 'pending',
        fullfilled: 'fullfilled',
        rejected: 'rejected'
    }

    state = this.STATE.pending

    static resolve = data => {
        return new Promise(resolve => resolve(data));
    }
    
    static reject = data => {
        return new Promise((resolve, reject) => reject(data));
    }
    
    static all = promises => {
        if (Array.isArray(promises)) {
            return Promise.reject(new Error(`${JSON.stringify(promises)} is not a array`));
        }
        const allPromise = promises.every(promise => promise instanceof Promise);
        if (!allPromise) {
            return Promise.reject(new Error(`${JSON.stringify(promises)} only process Promise`));
        }
    
        return new Promise((resolve, reject) => {
            let fullfilledCount = 0;
            const result = [];
    
            function checkForOut() {
                if (fullfilledCount === promises.length) {
                    resolve(result);
                }
            }
    
            promises.forEach((promise, index) => {
                promise.then(data => {
                    result[index] = data;
                    fullfilledCount++;
                    checkForOut();
                }).catch(e => {
                    reject(e);
                })
            })
            return new Promise(resolve => resolve(data));
        })
    }

    doResolve = data => {
        if (this.state === this.STATE.pending) {
            this.state = this.STATE.fullfilled;
            this.result = data;
        }
    }

    doReject = error => {
        if (this.state === this.STATE.pending) {
            this.state = this.STATE.rejected;
            this.result = error;
        }
    }

    constructor(func) {
        if (Object.prototype.toString.call(func) !== '[object Function]') {
            throw new Error(`${JSON.stringify(func)} is not a function`);
        }
        func.call(window, this.doResolve, this.doReject)
    }

    then = function(callback) {
        if (this.state === this.STATE.fullfilled) {
            callback(this.result);
            return this
        }
        setTimeout(() => {
            this.then(callback)
        }, 100)
    }

    catch = function(callback) {
        if (this.state === this.STATE.rejected) {
            callback(this.result);
            return this
        }
        setTimeout(() => {
            this.catch(callback)
        }, 100)
    }
}

describe('promise constructor', () => {
    it('should receive a function and initialize with new', () => {
        const inst1 = new Promise(() => {});
        expect(inst1 instanceof Promise).toBe(true);
    })

    // You must wrap the code in a function, otherwise the error will not be caught and the assertion will fail
    it('should throw error when initialized without a function', () => {
        expect(() => {new Promise(1)}).toThrow('1 is not a function');
    })
});

describe('promise then', () => {
    it('.then should get corret result', () => {
        const inst1 = new Promise(resolve => resolve(123));
        const inst2 = inst1.then(data => {
            expect(data).toBe(123);
        })
        expect(inst2 instanceof Promise).toBe(true);
    })
})

describe('Promise static method', () => {
    it('resolve', () => {
        const inst1 = Promise.resolve(123);
        const inst2 = inst1.then(data => {
            expect(data).toBe(123);
        })
        expect(inst2 instanceof Promise).toBe(true);
    })

    it('all', () => {
        const syncPromiseInst = new Promise(resolve => resolve('syncPromise'));
        const asyncPromiseInst = new Promise(resolve => {
            setTimeout(() => {
                resolve('asyncPromise')
            })
        });
        Promise.all([asyncPromiseInst, syncPromiseInst]).then(data => {
            expect(data.length).toBe(2);
            expect(data[0]).toBe('asyncPromise');
            expect(data[1]).toBe('syncPromise');
        })
    })
})
