import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getPokemons, getTypes, filterByTypes, filterByOrigin, orderByName, orderByStrength } from '../../actions';

import CardsPokemon from '../CardsPokemon/CardsPokemon';
import Paginated from '../Paginated/Paginated';
import SearchBar from '../SearchBar/SearchBar';

function Home () {
    const allPokemons = useSelector(state => state.pokemons)
    const allTypes = useSelector(state => state.pokemonTypes)
   
    const [currentPage, setCurrentPage] = useState(1)
    // const [order, setOrder] = useState('')
    
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPokemons())
        dispatch(getTypes())
    }, [dispatch])

    const handleReload = (e) => {
        e.preventDefault()
        dispatch(getPokemons(e.target.value))
    }

    const handleFilterByOrigin = (e) => {
        e.preventDefault()
        setCurrentPage(1)
        dispatch(filterByOrigin(e.target.value))
    }

    const handleFilterByTypes = (e) => {
        e.preventDefault()
        setCurrentPage(1)
        dispatch(filterByTypes(e.target.value))
    }

    const handleOrderByName = (e) => {
        e.preventDefault(e)
        setCurrentPage(1)
        dispatch(orderByName(e.target.value))
        // setOrder(e.target.value)
    }

    const handleOrderByStrength = (e) => {
        e.preventDefault()
        setCurrentPage(1)
        dispatch(orderByStrength(e.target.value))
        // setOrder(e.target.value)
    }
    const pokemonsPerPage = 12
    const lastPokemon = currentPage * pokemonsPerPage 
    const firstPokemon = lastPokemon - pokemonsPerPage 
    const currentPokemons = allPokemons.slice(firstPokemon, lastPokemon) 

    const handlePagination = (num) => {
        setCurrentPage(num)
    }

    return (
        <div>
            <h1>Pokemons</h1>
            <div>
                <Link to='/home'>
                    <button>Back Home</button>
                </Link>
            </div>
            <div>
                <Link to='/createdPokemon'>
                <button>Go to create your own Pokemon!</button>
                </Link>
            </div>
            <button onClick={handleReload}> 
                Load pokemons page!
            </button>
            <div>
                <SearchBar/>
            </div>
            <div>
                <select onChange={handleFilterByOrigin}>
                    <option value='allPokes'>Filter by Origin</option>
                    <option value='API'>Original Pokemons</option>
                    <option value='DB'>Created Pokemons</option>
                </select>
                <select onChange={handleFilterByTypes}>
                    <option value='allTypes'>Select Type</option>
                    {allTypes?.map(t => 
                    (<option value={t.name} key={t.id}>{t.name.charAt(0).toUpperCase() + t.name.slice(1)}</option>))
                    }
                </select>
                <select onChange={handleOrderByName}>
                    <option value= 'allNames'>Order by Name</option>
                    <option value= 'nameA-Z'>Ascendent A-Z</option>
                    <option value= 'nameZ-A'>Descendent Z-A</option>
                </select>
                <select onChange={handleOrderByStrength}>
                    <option value= 'allAttacks'>Order by Attack</option>
                    <option value= 'attackAsc'>Less to more strength</option>
                    <option value= 'attackDes'>More to less strength</option>
                </select>    
            </div>
                 <div>
                     <Paginated 
                     pokemonsPerPage={pokemonsPerPage} 
                     allPokemons={allPokemons.length} 
                     handlePagination={handlePagination}/>
                     <CardsPokemon 
                     allPokemons={currentPokemons}/>
                 </div>
        </div>
    )
}

export default Home;