import {
    deleteItem,
    getItem,
    addItem,
    editItem,
} from '../../../src/actions/index';
import {getItem as getLocalstorage} from '../../../src/utils/storage';


it('deleteItem & getItem & addItem & editItem should be a function', () => {
    expect(deleteItem).toBeInstanceOf(Function);
    expect(getItem).toBeInstanceOf(Function);
    expect(addItem).toBeInstanceOf(Function);
    expect(editItem).toBeInstanceOf(Function);
})

describe('it should be called correctly', () => {
    const storageKey = 'books';
    beforeEach(() => {
        // clear data
        localStorage.removeItem(storageKey);
    })
    test('getItem', async () => {
        const data = await getItem();
        expect(data.type).toBe('GET_ITEM');
        expect(data.payload).toBeInstanceOf(Promise);
        const res = await data.payload;
        expect(res).toHaveProperty('items');
        expect(res.items.length).toBe(0);
    })
    test('addItem', async () => {
        const data = await addItem({
            name: 'name',
            price: 'price',
        });
        expect(data.type).toBe('ADD_ITEM');
        expect(data.payload).toBeInstanceOf(Promise);
        const book = await data.payload;
        expect(book).toMatchObject({
            name: 'name',
            price: 'price',
        })
        expect(getLocalstorage(storageKey).length).toBe(1);
    })
    test('editItem', async () => {
        const data = await addItem({
            name: 'name',
            price: 'price',
        });
        const {id} = await data.payload;
        const editData = await editItem({
            id,
            name: 'newName',
            price: 'newPrice',
        });
        expect(editData.type).toBe('EDIT_ITEM');
        expect(editData.payload).toBeInstanceOf(Promise);
        const editResult = await editData.payload;
        expect(editResult).toMatchObject({
            name: 'newName',
            price: 'newPrice',
        })
    })
    test('deleteItem', async () => {
        const data = await addItem({
            name: 'name',
            price: 'price',
        });
        const {id} = await data.payload;
        expect(getLocalstorage(storageKey).length).toBe(1);

        const deleteData = await deleteItem(id);
        expect(deleteData.type).toBe('DELETE_ITEM');
        expect(deleteData.payload).toBeInstanceOf(Promise);
        await deleteData.payload;
        expect(getLocalstorage(storageKey).length).toBe(0);
    })
})