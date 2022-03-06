import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPokemons } from '../actions';
import CardPokemon from './CardPokemon';

function Home () {
    const dispatch = useDispatch()
    // Estado globales
    const allPokemons = useSelector((state) => state.pokemons)

    useEffect(() => {
        dispatch(getPokemons())
    }, [dispatch])

    const handleReload = (e) => {
        e.preventDefault()
        dispatch(getPokemons())
    }

    // Hacer la busque da que carga los pokemons en el logo de pokemon handleReset
    return (
        <div>
            <Link to='/createPokemon'>Lets create your own Pokemon!</Link>
            <h1>POKEMONS BY ORNE</h1>
            <button onClick={() => handleReload()}> 
                Load pokemons page!
            </button>
            <div>
                <select>
                    <option value='all'>All Pokemons</option>
                    <option value='API'>Original Pokemons</option>
                    <option value='DB'>Created Pokemons</option>
                </select>
                <select>
                    <option value='allNames'>Order by Name</option>
                    <option value= 'nameA-Z'>Ascendent</option>
                    <option value= 'nameZ-A'>Descendent</option>
                </select>
                <select>
                    <option value= 'allAtacks'>Order by Strength</option>
                    <option value= 'attackAsc'>Less to more strength</option>
                    <option value= 'attackDes'>More to less strength</option>
                </select>
            </div>
            
                {
                    allPokemons?.map(p => {
                        return (
                            
                        <CardPokemon name={p.name} image={p.image} id={p.id} key={p.id}/>
                      
                        )})
                      
                }
        </div>
    )

}

export default Home;