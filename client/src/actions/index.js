import axios from 'axios';
import {
    GET_POKEMONS, GET_POKEMONS_NAME, GET_POKEMONS_ID, GET_TYPES,
    CREATED_POKEMON, FILTER_BY_TYPES, FILTER_BY_ORIGIN, ORDER_BY_NAME,
    ORDER_BY_STRENGTH, CLEAR_STATE
} from './constans';


export function getPokemons() {
    return async (dispatch) => {
        try {
            const allPokemons = await axios.get('/pokemons')
            return dispatch({
                type: GET_POKEMONS,
                payload: allPokemons.data
            })
        }
        catch (error) {
            console.log(error)
        }
    }
}

export function getTypes() {
    return async (dispatch) => {
        try {
            const types = await axios.get('/types')
            return dispatch({
                type: GET_TYPES,
                payload: types.data
            })
        }
        catch (error) {
            console.log(error)
        }
    }
}

export function getPokemonsName(name) {
    return async (dispatch) => {
        try {
            const pokemonName = await axios.get(`/pokemons/?name=${name}`)
            return dispatch({
                type: GET_POKEMONS_NAME,
                payload: pokemonName.data
            })
        }
        catch (error) {
            console.log(error)
        }
    }
}

export function getPokemonsId(id) {
    return async (dispatch) => {
        try {
            const detail = await axios.get(`/pokemons/${id}`)
            return dispatch({
                type: GET_POKEMONS_ID,
                payload: detail.data
            })
        }
        catch (error) {
            console.log(error)
        }
    }
}

export function createdPokemon(payload) {
    return async () => {
        try {
            const info = await axios.post('/pokemons', payload)
            return ({
                type: CREATED_POKEMON,
                payload: info.data
            })
        }
        catch (error) {
            console.log(error)
        }
    }
}

export function filterByTypes(payload) {
    return {
        type: FILTER_BY_TYPES,
        payload
    }
}

export function filterByOrigin(payload) {
    return {
        type: FILTER_BY_ORIGIN,
        payload
    }
}

export function orderByName(payload) {
    return {
        type: ORDER_BY_NAME,
        payload
    }
}

export function orderByStrength(payload) {
    return {
        type: ORDER_BY_STRENGTH,
        payload
    }
}

export function clearState() {
    return {
        type: CLEAR_STATE
    }
}

// export function searchTypes(payload) {
//     return {
//         type: 'SEARCH_TYPES',
//         payload
//     }
// }
