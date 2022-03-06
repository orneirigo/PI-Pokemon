// import axios from 'axios';
import { GET_POKEMONS } from './constans';


export function getPokemons () {
    return (dispatch) => {
        return fetch ('http://localhost:3001/pokemons/')
        .then(response => response.json())
        .then(pokemons => {
            dispatch({
                type: GET_POKEMONS,
                payload: pokemons
            })
        })
        .catch((error) => console.log(error))
    }
}


