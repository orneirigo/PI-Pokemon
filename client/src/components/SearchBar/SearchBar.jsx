import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { getPokemonsName } from '../../actions'

function SearchBar () {
    const dispatch = useDispatch()
    const [pokemonName, setPokemonName] = useState('')

    const handleInput = (e) => {
        e.preventDefault()
        setPokemonName(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(getPokemonsName(pokemonName)) 
        setPokemonName('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type='text' placeholder='Look for a pokemon!' value={pokemonName} onChange={handleInput}/>
            <input type='submit' value='Lets go!'/>
        </form>
    )
}

export default SearchBar;