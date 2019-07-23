/* eslint-disable */

const STATUS = {
    pending: 'pending',
    fulfilled: 'fulfilled',
    rejected: 'rejected'
}

const isFunction = target => {
    return Object.prototype.toString.call(target) === '[object Function]';
}

class XPromise {
    constructor(handle) {
        debugger
        if (!isFunction(handle)) {
            throw new Error(`${JSON.stringify(handle)} is not a function`);
        }

        this._status = STATUS.pending;
        this._value = undefined;

        this._filfulledQueue = [];
        this._rejectedQueue = [];

        try {
            handle(this._doResolve, this._doReject)
        } catch (error) {
            return this._doReject(error);
        }
    }

    _doResolve = data => {
        if (this._status !== STATUS.pending) {
            return;
        }

        this._status = STATUS.fulfilled;
        this._value = data;
        
        while(this._filfulledQueue.length) {
            const callback = this._filfulledQueue.shift();
            callback(this._value);
        }

        return this;
    }

    _doReject = error => {
        if (this._status !== STATUS.pending) {
            return;
        }

        this._status = STATUS.rejected;
        this._value = error;
        
        while(this._rejectedQueue.length) {
            const callback = this._rejectedQueue.shift();
            callback(this._value);
        }

        return this;
    }

    then = (onFilfulledCallback, onRejectedCallback) => {
        return new XPromise((resolve, reject) => {
            const _fulfilled = value => {
                try {
                    if (!isFunction(onFilfulledCallback)) {
                        return resolve(value);
                    }

                    const newValue = onFilfulledCallback(value);
                    if (!(newValue instanceof XPromise)) {
                        return resolve(newValue);
                    }
                    
                    return newValue.then(data => resolve(data));
                } catch (error) {
                    reject(error)
                }
            };

            const _rejected = value => {
                try {
                    if (!isFunction(onRejectedCallback)) {
                        return reject(value);
                    }

                    const newValue = onRejectedCallback(value);
                    if (newValue instanceof XPromise) {
                        return reject(newValue);
                    }
                    
                    return reject(XPromise.reject(value));
                } catch (error) {
                    reject(error)
                }
            };

            switch(this._status) {
                case STATUS.pending:
                    this._filfulledQueue.push(onFilfulledCallback);
                    this._rejectedQueue.push(onRejectedCallback);
                    break;

                case STATUS.fulfilled:
                    _fulfilled(this._value);
                    break;

                case STATUS.rejected:
                    _rejected(this._value);
                    break;
            }
        });
    }

    catch = onRejected => {
        return this.then(undefined, onRejected)
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

        promises = promises.map(promise => promise instanceof XPromise ? promise : XPromise.resolve(promise));
    
        return new XPromise((resolve, reject) => {
            let fullfilledCount = 0;
            const result = [];

            promises.forEach((promise, index) => {
                promise.then(data => {
                    result[index] = data;
                    fullfilledCount++;
                    if (fullfilledCount === promises.length) {
                        resolve(result);
                    }
                }, e => {
                    reject(e);
                })
            })
        })
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

    it('.then should get corret result part 2', done => {
        const inst1 = new XPromise((resolve, reject) => reject(123));
        inst1.then(() => {}, data => {
            expect(data).toBe(123);
            done();
        })
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

    it('parameter of all isn\'t xpromise', () => {
        XPromise.all(['asyncPromiseInst', 'syncPromiseInst']).then(data => {
            expect(data.length).toBe(2);
            expect(data[0]).toBe('asyncPromise');
            expect(data[1]).toBe('syncPromise');
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
            return XPromise.resolve(789);
        }).then(data => {
            expect(data).toBe(789);
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