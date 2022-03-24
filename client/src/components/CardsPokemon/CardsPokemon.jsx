import React from "react";
import CardPokemon from "../CardPokemon/CardPokemon";
import styles from './CardsPokemon.module.css';

function CardsPokemon ({allPokemons}) {
    return (
        <div className={styles.grid}>
                {allPokemons.map(pokemon => (
                    <CardPokemon
                    id={pokemon.id}
                    key={pokemon.id}
                    name={pokemon.name}
                    image={pokemon.image}
                    types={pokemon.types}
                    />
                    ))}
        </div>
    )
}

export default CardsPokemon;