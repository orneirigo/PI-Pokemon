import React from "react";
import CardPokemon from "../CardPokemon/CardPokemon";

function CardsPokemon ({allPokemons}) {
    return (
        <div>
            {allPokemons.map(pokemon => (
                <CardPokemon
                id={pokemon.id}
                key={pokemon.id}
                name={pokemon.name}
                image={pokemon.image}
                types={pokemon.types}
                attack={pokemon.attack}
                />
            ))}
        </div>
    )
}

export default CardsPokemon;