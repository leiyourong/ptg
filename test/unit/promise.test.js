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

var SelfPromise = function(func) {
    if (Object.prototype.toString.call(func) !== '[object Function]') {
        throw new Error(`${JSON.stringify(func)} is not a function`);
    }
    var STATE = {
        pending: 'pending',
        fullfilled: 'fullfilled',
        rejected: 'rejected'
    }
    var state = STATE.pending;
    var result = '';

    var doResolve = data => {
        if (state === STATE.pending) {
            state = STATE.fullfilled;
            result = data;
        }
    }

    var doReject = error => {
        if (state === STATE.pending) {
            state = STATE.rejected;
            result = error;
        }
    }

    func.call(window, doResolve, doReject)

    this.then = function(callback) {
        if (state === STATE.fullfilled) {
            return callback(result);
        }
        setTimeout(() => {
            this.then(callback)
        }, 100)
    }

    this.catch = function(callback) {
        if (state === STATE.rejected) {
            return callback(result);
        }
        setTimeout(() => {
            this.catch(callback)
        }, 100)
    }
};

// var a = new SelfPromise(function(resolve, reject) {
//         setTimeout(() => {
//             resolve(111);
//         }, 1000);
// })
// a.then(data => {console.log(data)}) // data -> 111

describe('promise constructor', () => {
    it('should receive a function and initialize with new', () => {
        const inst1 = new SelfPromise(() => {});
        expect(inst1 instanceof SelfPromise).toBe(true);
    })

    // You must wrap the code in a function, otherwise the error will not be caught and the assertion will fail
    it('should throw error when initialized without a function', () => {
        expect(() => {new SelfPromise(1)}).toThrow('1 is not a function');
    })
});
