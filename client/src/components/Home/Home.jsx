import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPokemons, getTypes, filterByTypes, filterByOrigin, orderByName, orderByStrength } from '../../actions';

import CardsPokemon from '../CardsPokemon/CardsPokemon';
import Paginated from '../Paginated/Paginated';
import SearchBar from '../SearchBar/SearchBar';

import styles from './Home.module.css';
import Logo from '../../images/Logo.png';
import PikachuSleep from '../../images/PikachuSleep.png';

function Home () {
    const allPokemons = useSelector(state => state.pokemons)
    const allTypes = useSelector(state => state.pokemonTypes)
   
    const [currentPage, setCurrentPage] = useState(1)
    
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getPokemons())
        dispatch(getTypes())
    }, [dispatch])

    const handleReload = (e) => {
        e.preventDefault()
        dispatch(getPokemons())
    }

    const handleFilterByOrigin = (e) => {
        e.preventDefault()
        dispatch(filterByOrigin(e.target.value))
        setCurrentPage(1)
    }

    const handleFilterByTypes = (e) => {
        e.preventDefault()
        dispatch(filterByTypes(e.target.value))
        setCurrentPage(1)
    }

    const handleOrderByName = (e) => {
        e.preventDefault(e)
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
    }

    const handleOrderByStrength = (e) => {
        e.preventDefault()
        dispatch(orderByStrength(e.target.value))
        setCurrentPage(1)
    }

    const pokemonsPerPage = 12
    const lastPokemon = currentPage * pokemonsPerPage 
    const firstPokemon = lastPokemon - pokemonsPerPage 
    const currentPokemons = allPokemons.slice(firstPokemon, lastPokemon) 

    const handlePagination = (num) => {
        setCurrentPage(num)
    }

    return (
        <div className={styles.backgroundHome}>
             <div className={styles.nav}>
                 <div className={styles.logo}>
                    <Link to ='/home'>
                        <img onClick={handleReload} src={Logo} alt='Logo not found' width='300px'/>
                    </Link>
                </div>
                <div>
                    <Link to='/createdPokemon'>
                        <button className={styles.create}>Go to create your own Pokemon!</button>
                    </Link>
                </div>
                <div className={styles.search}>
                    <SearchBar/>
                </div>
            </div>
            <div>
                <select onChange={handleFilterByOrigin} className={styles.select}>
                    <option value='allPokes'>Filter by Origin</option>
                    <option value='API'>Original Pokemons</option>
                    <option value='DB'>Created Pokemons</option>
                </select>
                <select onChange={handleFilterByTypes} className={styles.select}>
                    <option value='allTypes'>Select Type</option>
                    {allTypes?.map(t => 
                    (<option value={t.name} key={t.id}>{t.name.charAt(0).toUpperCase() + t.name.slice(1)}</option>))
                    }
                </select>
                <select onChange={handleOrderByName} className={styles.select}>
                    <option value= 'allNames'>Order by Name</option>
                    <option value= 'nameA-Z'>Ascendent A-Z</option>
                    <option value= 'nameZ-A'>Descendent Z-A</option>
                </select>
                <select onChange={handleOrderByStrength} className={styles.select}>
                    <option value= 'allAttacks'>Order by Attack</option>
                    <option value= 'attackAsc'>Less to more attack</option>
                    <option value= 'attackDes'>More to less attack</option>
                </select>    
            </div>
                 <div>
                     <Paginated 
                     pokemonsPerPage={pokemonsPerPage} 
                     allPokemons={allPokemons.length} 
                     handlePagination={handlePagination}/>
                     
                   {!currentPokemons.length ? 
                   <div className={styles.waiting}>
                       <p className={styles.waitingLetter}>Pokemon not found... Try again!</p>
                       <img src={PikachuSleep} alt='Pikachu lost' width='550px'/>
                   </div>
                    : <CardsPokemon 
                     allPokemons={currentPokemons}/>}
                 </div>
        </div>
    )
}

export default Home;