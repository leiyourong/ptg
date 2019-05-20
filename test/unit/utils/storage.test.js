import * as storage from '../../../src/utils/storage';

describe('it should be exported correctly', () => {
    test('should export two function getItem & setItem', () => {
        expect(storage).toHaveProperty('getItem');
        expect(storage).toHaveProperty('setItem');
    });
})

describe('should has correctly display', () => {
    test('setItem & getItem function test', () => {
        const key = 'testKey', value = 'testValue';
        const {getItem, setItem} = storage;
        setItem(key, value)
        expect(getItem(key)).toBe(value);
    })
})