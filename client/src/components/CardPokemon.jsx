import React from 'react';
import { Link } from 'react-router-dom';

function CardPokemon ({id, name, image, types}) {
    return (
        <div>
            <h3>{name}</h3>
            <Link to={`/home/${id}`}/>
            <img src={image} alt='Img not found!'/>
        </div>
    )
}

export default CardPokemon;