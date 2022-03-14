import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store} from '../../store/index'
import { render } from '@testing-library/react';
import App from '../../App';
import CreatedPokemon  from './CreatedPokemon';

describe('CreatedPokemon', () => {

    it('The form shoud have an input with the name "name" and the type "text"', () => {
        const { container } = render(<Provider store={store}> <BrowserRouter><App/><CreatedPokemon/></BrowserRouter></Provider>)
        const element = container.getByText('input')
        expect(element.type).toBe('text');
        expect(element.name).toBe('name');
    });

    it('The form should have an input with the name "hp" y and the type type "number"', () => {
        const { container } = render(<Provider store={store}> <BrowserRouter><App/><CreatedPokemon/></BrowserRouter></Provider>)
        const element = container.getByText('input')
        expect(element.type).toBe('number');
        expect(element.name).toBe('hp');
    });
})