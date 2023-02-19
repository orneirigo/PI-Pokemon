import {
    GET_POKEMONS, GET_POKEMONS_NAME, GET_POKEMONS_ID, GET_TYPES, CREATED_POKEMON, FILTER_BY_TYPES,
    FILTER_BY_ORIGIN, ORDER_BY_NAME, ORDER_BY_STRENGTH, CLEAR_STATE
} from "../actions/constans";

const initialState = {
    pokemons: [],
    pokemonsBackUp: [],
    pokemonTypes: [],
    pokemonDetail: {}
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_POKEMONS: {
            return {
                ...state,
                pokemons: action.payload,
                pokemonsBackUp: action.payload,
            }
        }
        case GET_TYPES: {
            return {
                ...state,
                pokemonTypes: action.payload,
            }
        }
        case GET_POKEMONS_NAME: {
            return {
                ...state,
                pokemons: action.payload
            }
        }
        case GET_POKEMONS_ID: {
            return {
                ...state,
                pokemonDetail: action.payload
            }
        }
        case CREATED_POKEMON: {
            return {
                ...state
            }
        }
        case FILTER_BY_ORIGIN: {
            const filterOrigin = action.payload === 'DB'
                ? state.pokemonsBackUp.filter(f => f.createdIdDB)
                : state.pokemonsBackUp.filter(f => !f.createdIdDB)
            return {
                ...state,
                pokemons: action.payload === 'allPokes' ? state.pokemonsBackUp : filterOrigin
            }
        }
        case FILTER_BY_TYPES: {
            const filerTypes = action.payload === 'allTypes' ? state.pokemonsBackUp
                : state.pokemonsBackUp.filter(f => f.types?.includes(action.payload))
            return {
                ...state,
                pokemons: filerTypes
            }
        }
        case ORDER_BY_NAME: {
            let orderByName = action.payload === 'nameA-Z'
                ? state.pokemons.slice().sort((a, b) => {
                    if (a.name > b.name) return 1
                    if (b.name > a.name) return -1
                    return 0
                })
                : state.pokemons.slice().sort((a, b) => {
                    if (b.name > a.name) return 1
                    if (a.name > b.name) return -1
                    return 0
                })
            return {
                ...state,
                pokemons: action.payload === 'allPokes' ? state.pokemonsBackUp : orderByName
            }
        }
        case ORDER_BY_STRENGTH: {
            let orderByStr = action.payload === 'attackAsc'
                ? state.pokemons.slice().sort((a, b) => a.attack - b.attack)
                : state.pokemons.slice().sort((a, b) => b.attack - a.attack)
            return {
                ...state,
                pokemons: orderByStr
            }
        }
        case CLEAR_STATE: {
            return {
                ...state,
                pokemonDetail: {}
            }
        }
        default:
            return state
    }
}

export default rootReducer

// case 'SEARCH_TYPES': {
//     const types = state.pokemonsBackUp.filter(f => f.types?.includes(action.payload))
//     return {
//         ...state,
//         pokemons: types
//     }
// }