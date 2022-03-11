import axios from 'axios';
import { GET_POKEMONS, GET_POKEMONS_NAME, GET_POKEMONS_ID, GET_TYPES, CREATED_POKEMON, 
        FILTER_BY_TYPES, FILTER_BY_ORIGIN, ORDER_BY_NAME, ORDER_BY_STRENGTH,} from './constans';

export function getPokemons () {
    return (dispatch) => {
        return fetch ('http://localhost:3001/pokemons/')
        .then(response => response.json())
        .then(allPokemons => {
            dispatch({
                type: GET_POKEMONS,
                payload: allPokemons
            })
        })
        .catch(error => console.log(error))
    }
}

export function getPokemonsName (name) {
    return (dispatch) => {
        return fetch (`http://localhost:3001/pokemons/?name=${name}`)
        .then(response => response.json())
        .then(pokemonName => {
            dispatch({
                type: GET_POKEMONS_NAME,
                payload: pokemonName
            })
        })
        .catch(error => console.log(error))
    }
}

export function getPokemonsId (id) {
    return (dispatch) => {
        return fetch (`http://localhost:3001/pokemons/${id}`)
        .then(response => response.json())
        .then(detail => {
            dispatch({
                type: GET_POKEMONS_ID,
                payload: detail
            })
        })
        .catch(error => console.log(error))
    }
}

export function getTypes () {
    return async (dispatch) => {
        try {
            const info = await axios.get('http://localhost:3001/types/')
            return dispatch({
                type: GET_TYPES,
                payload: info.data
        })}
        catch(error) {
            console.log(error)
        }
    }
}

export function createdPokemon (payload) {
    return async () => {
        try {
            const info = await axios.post('http://localhost:3001/pokemons/', payload)
            return ({
                type: CREATED_POKEMON,
                payload: info.data
        })}
        catch(error) {
            console.log(error)
        }
    }
}

export function filterByTypes (payload) {
    return {
        type: FILTER_BY_TYPES,
        payload
    }
}

export function filterByOrigin (payload) {
    return {
        type: FILTER_BY_ORIGIN,
        payload
    }
}

export function orderByName (payload) {
    return {
        type: ORDER_BY_NAME,
        payload
    }
}

export function orderByStrength (payload) {
    return {
        type: ORDER_BY_STRENGTH,
        payload
    }
}



