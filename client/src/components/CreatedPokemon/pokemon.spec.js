import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { render } from '@testing-library/react';
import store from '../store/index'
import App from '../../App.js';
import CreatedPokemon from "./CreatedPokemon";

configure({ adapter: new Adapter() });

describe("<CreatedPokemon/>", () => {

  describe("Estructura", () => {
    let createPokemon;
    beforeEach(() => {
      createPokemon= render(
        <Provider store={store}>
          <BrowserRouter>
            <App/>
            <CreatedPokemon/>
          </BrowserRouter>
        </Provider>
      );
    });

    it("Debería renderizar un form", () => {
      expect(createPokemon.find("form")).toHaveLength(1);
    });

    it('Debería renderizar un label con el texto "Name: "', () => {
      expect(createPokemon.find("label").at(0).text()).toEqual("Name: ");
    });

    it('Debería renderizar un input con la propiedad "name" igual a "name"', () => {
      expect(createPokemon.find('input[name="name"]')).toHaveLength(1);
    });

    it('Debería renderizar un label con el texto "HP: "', () => {
      expect(createPokemon.find("label").at(1).text()).toEqual("HP: ");
    });

    it('Debería renderizar un input con la propiedad "name" igual a "hp"', () => {
      expect(createPokemon.find('input[name="hp"]')).toHaveLength(1);
    });

    it('Debería renderizar un label con el texto "Attack: "', () => {
      expect(createPokemon.find("label").at(2).text()).toEqual("Attack: ");
    });

    it('Debería renderizar un input con la propiedad "name" igual a "attack"', () => {
      expect(createPokemon.find('input[name="attack"]')).toHaveLength(1);
    });

    it('Debería renderizar un button con "type" igual a "submit" y con texto "Create Pokemon"', () => {
      expect(createPokemon.find('button[type="submit"]')).toHaveLength(1);
      expect(createPokemon.find("button").at(0).text()).toEqual("Create Pokemon");
    });
});
});
