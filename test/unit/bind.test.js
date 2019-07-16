/* eslint-disable */
Function.prototype.selfBind = function(context, ...args) {
    const self = this;
    const func = function(...otherArgs) {
        return self.apply(context, args.concat(otherArgs))
    }
    func.prototype = self.prototype;
    return func
}

describe('selfBind', () => {
    const func = function(left, right) {
        return `${this.count}-${left}-${right}`;
    }

    it('selfBind exist and correct call', () => {
        expect(func.selfBind).toBeInstanceOf(Function);
        const newFunc = func.selfBind({});
        expect(newFunc()).toBe('undefined-undefined-undefined');
    }) 

    it('selfBind with args', () => {
        let newFunc = func.selfBind({count: 1});
        expect(newFunc()).toBe('1-undefined-undefined');
        expect(newFunc(2)).toBe('1-2-undefined');
        newFunc = func.selfBind({count: 1}, 2);
        expect(newFunc()).toBe('1-2-undefined');
        expect(newFunc(3)).toBe('1-2-3');
    })

    it('selfBind prototype', () => {
        func.prototype.data = '123';
        const in1 = new func();
        expect(in1.data).toBe('123');
        const NewFunc = func.selfBind({});
        const in2 = new NewFunc();
        expect(in2.data).toBe('123');
    })
});