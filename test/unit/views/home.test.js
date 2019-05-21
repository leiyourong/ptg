import React from 'react';
import Home from '../../../src/views/home';
import Enzyme from '../enzyme';
const {shallow, render, mount} = Enzyme;
// mock fetch
global.fetch = jest.fn(() => new Promise(resolve => resolve()));

describe('it should be a react Component', () => {
    test('it should have correct react component property', () => {
        const wrapper = shallow(<Home />);
        console.log(wrapper);
        expect(Home).toHaveProperty('type');
    })
})