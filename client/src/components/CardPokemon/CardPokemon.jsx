import React from 'react';
import { Link } from 'react-router-dom';

function CardPokemon ({id, name, image, types, attack}) {
    const pokeName = name[0].toUpperCase() + name.slice(1)
    const pokeTypes = types?.map(t => <h4 key={t}> {t[0].toUpperCase() + t.slice(1)}</h4>)
    return (
        <Link to={`/home/${id}`}>
            <div>
                <h2>{pokeName}</h2>
                <h3>Attack: {attack}</h3>
                <img src={image} alt='Img not found!'/>
                <div>{pokeTypes}</div>
            </div>
        </Link>
    )
}

export default CardPokemon;