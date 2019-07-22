/* eslint-disable */

const PROMISE_STATE = {
    pending: 'pending',
    fulfilled: 'fulfilled',
    rejected: 'rejected'
}

class XPromise {
    result = ''
    
    state = PROMISE_STATE.pending

    constructor(func) {
        if (Object.prototype.toString.call(func) !== '[object Function]') {
            throw new Error(`${JSON.stringify(func)} is not a function`);
        }
        try {
            func.call(window, this._doResolve, this._doReject)
        } catch (error) {
            return this._doReject(error);
        }
        
    }

    static resolve = data => {
        return new XPromise(resolve => resolve(data));
    }
    
    static reject = data => {
        return new XPromise((resolve, reject) => reject(data));
    }
    
    static all = promises => {
        if (!Array.isArray(promises)) {
            return XPromise.reject(new Error(`${JSON.stringify(promises)} is not a array`));
        }
        const allPromise = promises.every(promise => promise instanceof XPromise);
        if (!allPromise) {
            return XPromise.reject(new Error(`${JSON.stringify(promises)} only process XPromise`));
        }
    
        return new XPromise((resolve, reject) => {
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
        })
    }

    _doResolve = data => {
        if (this.state === PROMISE_STATE.pending) {
            this.state = PROMISE_STATE.fulfilled;
            this.result = data;
        }
        return this;
    }

    _doReject = error => {
        if (this.state === PROMISE_STATE.pending) {
            this.state = PROMISE_STATE.rejected;
            this.result = error;
        }
        return this;
    }

    then = callback => {
        if (this.state === PROMISE_STATE.fulfilled) {
            this.result = callback(this.result);
        } else {
            setTimeout(() => {
                this.then(callback)
            }, 100)
        }
        return this;
    }

    catch = callback => {
        if (this.state === PROMISE_STATE.rejected) {
            this.result = callback(this.result);
        } else {
            setTimeout(() => {
                this.catch(callback)
            }, 100)
        }
        return this
    }
}

describe('promise constructor', () => {
    it('should receive a function and initialize with new', () => {
        const inst1 = new XPromise(() => {});
        expect(inst1 instanceof XPromise).toBe(true);
    })

    // You must wrap the code in a function, otherwise the error will not be caught and the assertion will fail
    it('should throw error when initialized without a function', () => {
        expect(() => {new XPromise(1)}).toThrow('1 is not a function');
    })
});

describe('promise then', () => {
    it('.then should get corret result', done => {
        const inst1 = new XPromise(resolve => resolve(123));
        const inst2 = inst1.then(data => {
            expect(data).toBe(123);
            done();
        })
        expect(inst2 instanceof XPromise).toBe(true);
    })
})

describe('promise catch', () => {
    it('.catch should get corret result', done => {
        const inst1 = new XPromise((resolve, reject) => reject(123));
        const inst2 = inst1.catch(data => {
            expect(data).toBe(123);
            done();
        })
        expect(inst2 instanceof XPromise).toBe(true);
    })
})

describe('XPromise static method', () => {
    it('resolve', done => {
        const inst1 = XPromise.resolve(123);
        const inst2 = inst1.then(data => {
            expect(data).toBe(123);
            done();
        })
        expect(inst2 instanceof XPromise).toBe(true);
    })

    it('all', done => {
        const syncPromiseInst = new XPromise(resolve => resolve('syncPromise'));
        const asyncPromiseInst = new XPromise(resolve => {
            setTimeout(() => {
                resolve('asyncPromise')
            })
        });
        XPromise.all([asyncPromiseInst, syncPromiseInst]).then(data => {
            expect(data.length).toBe(2);
            expect(data[0]).toBe('asyncPromise');
            expect(data[1]).toBe('syncPromise');
            done();
        })
    })

    it('all with reject', done => {
        const syncPromiseInst = new XPromise(resolve => resolve('syncPromise'));
        const asyncPromiseInst = new XPromise((resolve, reject) => {
            setTimeout(() => {
                reject('asyncPromiseError')
            })
        });

        XPromise.all([asyncPromiseInst, syncPromiseInst]).catch(errMsg => {
            expect(errMsg).toBe('asyncPromiseError');
            done();
        })
    })
})

describe('advanced call', () => {
    it('cycle call', done => {
        const inst1 = XPromise.resolve(123);
        inst1.then(data => {
            expect(data).toBe(123);
            return 456
        }).then(data => {
            expect(data).toBe(456);
            done();
        })
    })

    it('could catch error', done => {
        const inst1 = new XPromise((resolve, reject) => {
            const a = 1;
            a.b.c = 456;
            resolve(456);
        });

        inst1.then(() => {
            throw new Error('should not be called');
        }).catch(data => {
            expect(data instanceof Error).toBe(true);
            done();
        })
    })
})