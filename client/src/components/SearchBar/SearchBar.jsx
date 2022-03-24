import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonsName } from '../../actions';
// import { searchTypes } from '../../actions';
import styles from './SearchBar.module.css';

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

    // Para buscar en la search bar por tipos de pokemon
    // const [type, setType] = useState('')

    // const handleInput = (e) => {
    //     e.preventDefault()
    //     setType(e.target.value)
    // }

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     dispatch(getPokemonsName(type)) 
    //     setType('')
    // }

    return (
        <form onSubmit={handleSubmit}>
            <input className={styles.lookFor} type='text' placeholder='Look for a pokemon!' value={pokemonName} onChange={handleInput}/>
            <input className={styles.go} type='submit' value='Lets go!'/>
        </form>
    )
}

export default SearchBar;