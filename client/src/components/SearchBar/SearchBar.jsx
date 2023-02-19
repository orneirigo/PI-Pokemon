import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonsName } from '../../actions';
// import { searchTypes } from '../../actions';
import styles from './SearchBar.module.css';

function SearchBar() {
    const dispatch = useDispatch()
    const [pokemonName, setPokemonName] = useState('')

    const handleInput = (e) => {
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
    //     setType(e.target.value)
    // }

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     dispatch(searchTypes(type)) 
    //     setType('')
    // }

    return (
        <form onSubmit={handleSubmit} className={styles.containerSearchBar}>
            <input type='text' placeholder='Search...' value={pokemonName} onChange={handleInput} />
            <i>
                <box-icon name='search-alt-2' color="grey" className={styles.icon}></box-icon>
            </i>
        </form>
    )
}

export default SearchBar;