import React from 'react';
import MyWorker from '../../../src/views/worker';
import Enzyme from '../enzyme';
const {shallow, render, mount} = Enzyme;
// mock fetch
global.fetch = jest.fn(() => new Promise(resolve => resolve()));

describe('it should be a react Component', () => {
    test('should correctly handle props: result', () => {
        const app = shallow(<MyWorker result={10} />);
        const resultContainer = app.find('.result');
        expect(resultContainer.text()).toBe('10');
    }) 
    test('it should have correct react component property', () => {
        const app = mount(<MyWorker />);
        const buttons = app.find('Button');
        expect(buttons.length).toBe(3);
        // NoWebWork.simulate('click');
        buttons.at(0).simulate('click');
        expect.hasAssertions();
        buttons.at(2).simulate('click');
        // console.log(wrapper);
        // expect(Home).toHaveProperty('type');
    })
})