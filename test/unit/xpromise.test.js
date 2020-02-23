/* eslint-disable */
var isFunction = (args) => Object.prototype.toString.call(args) === '[object Function]'
var Status = {
  pending: 'pending',
  fulfilled: 'fulfilled',
  rejected: 'rejected'
}

function getResult(self, initData) {
    if (self._fulfillCallback.length === 0) {
        self["[[PromiseStatus]]"] = Status.fulfilled
        self["[[PromiseValue]]"] = initData
        return self;
    }
    var callback = self._fulfillCallback.shift();
    var result = callback(initData);
    if (result instanceof XPromise) {
        result.then(data => {
            getResult(self, data);
        })
    } else {
        getResult(self, result);
    }
}

function _resolve (data) {
  if (this["[[PromiseStatus]]"] !== Status.pending) {
    return
  }
  
  return getResult(this, data);
}

function _rejected (data) {
  if (this["[[PromiseStatus]]"] !== Status.pending) {
    return
  }
  this["[[PromiseStatus]]"] = Status.rejected
  this["[[PromiseValue]]"] = data
}

class XPromise {
  constructor (executor) {
      debugger
    if (!isFunction(executor)) {
      throw new Error(`${JSON.stringify(executor)} is not a function`)
    }
    this["[[PromiseStatus]]"] = Status.pending
    this["[[PromiseValue]]"] = null
    this._fulfillCallback = [];
    executor(_resolve.bind(this), _rejected.bind(this))
  }

  then = (onFulFilled, onRejected) => {
    if (!isFunction(onFulFilled) || (onRejected && !isFunction(onRejected))) {
        return this
    }

    if (this["[[PromiseStatus]]"] === Status.pending) {
        this._fulfillCallback.push(onFulFilled);
        return this
    }
    
    try {
        this["[[PromiseValue]]"] = onFulFilled(this["[[PromiseValue]]"])
    } catch (error) {
        return onRejected(error)
    }
    return this
  }
}

// XPromise.prototype.

describe('promise constructor', () => {
  it('should receive a function and initialize with new', () => {
    const inst1 = new XPromise(() => {});
    expect(inst1 instanceof XPromise).toBe(true)
  })

  it('should throw error when initialized without a function', () => {
    expect(() => new XPromise(1)).toThrow('1 is not a function')
  })
})


describe('promise then', () => {
    it('.then should get corret result', done => {
        new XPromise(resolve => resolve('123')).then(data => {
            expect(data).toBe('123');
            return data + '456';
        }).then(data => {
            expect(data).toBe('123456');
            done();
        });
    })

    it('.then should get corret result: async', done => {
        new XPromise(resolve => setTimeout(() => resolve('123'), 1000)).then(data => {
            expect(data).toBe('123');
            return new XPromise(resolve => setTimeout(() => resolve(data + '456'), 1000))
        }).then(data => {
            expect(data).toBe('123456');
            done();
        })
    })
})
