import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getPokemons,
    getTypes,
    filterByTypes,
    filterByOrigin,
    orderByName,
    orderByStrength
} from "../../actions";

import CardsPokemon from "../CardsPokemon/CardsPokemon";
import Loading from "../Loading/Loading";
import NavBar from "../NavBar/NavBar";
import Paginated from "../Paginated/Paginated";
import SearchBar from "../SearchBar/SearchBar";

import 'boxicons';
import styles from "./Home.module.css";

function Home() {
    const dispatch = useDispatch();

    const allPokemons = useSelector((state) => state.pokemons);
    const allTypes = useSelector((state) => state.pokemonTypes);

    const [currentPage, setCurrentPage] = useState(1);

    const pokemonsPerPage = 12;
    const lastPokemon = currentPage * pokemonsPerPage;
    const firstPokemon = lastPokemon - pokemonsPerPage;
    const currentPokemons = allPokemons.slice(firstPokemon, lastPokemon);

    useEffect(() => {
        dispatch(getPokemons());
        dispatch(getTypes());
    }, [dispatch]);

    const handleReload = () => {
        window.location.reload(false);
    }

    const handleFilterByOrigin = (e) => {
        dispatch(filterByOrigin(e.target.value));
        setCurrentPage(1);
    };

    const handleFilterByTypes = (e) => {
        dispatch(filterByTypes(e.target.value));
        setCurrentPage(1);
    };

    const handleOrderBy = (e) => {
        if (e.target.value === "nameA-Z" || e.target.value === "nameZ-A") {
            dispatch(orderByName(e.target.value));
        } else if (
            e.target.value === "attackAsc" ||
            e.target.value === "attackDes"
        ) {
            dispatch(orderByStrength(e.target.value));
        } else {
            e.target.value === "allPokes" && dispatch(orderByName(e.target.value));
        }
        setCurrentPage(1);
    };

    return (
        <>
            <NavBar
                allTypes={allTypes}
                handleReload={handleReload}
                handleFilterByOrigin={handleFilterByOrigin}
                handleFilterByTypes={handleFilterByTypes}
                handleOrderBy={handleOrderBy}
            >
                <SearchBar />
            </NavBar>

            <div className={styles.containerHome}>
                {currentPokemons.length ? (
                    <>
                        <Paginated
                            pokemonsPerPage={pokemonsPerPage}
                            allPokemons={allPokemons.length}
                            currentPokemons={currentPokemons}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                        <CardsPokemon currentPokemons={currentPokemons} />
                    </>
                ) : (
                    <Loading />
                )}
            </div>
        </>
    );
}

export default Home;
