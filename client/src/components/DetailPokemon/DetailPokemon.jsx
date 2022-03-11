import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link , useParams } from "react-router-dom";

import { getPokemonsId } from "../../actions";

function DetailPokemon () {
    const dispatch = useDispatch()
    const params = useParams()

    useEffect(() => {
        dispatch(getPokemonsId(params.id))
    }, [dispatch, params.id])

    const pokeDetail = useSelector(state => state.pokemonDetail)
    console.log(pokeDetail)

    return (
        <div>
            {
                // pokeDetail.length > 0 ?
                <div>
                    <h1>{pokeDetail.name}</h1>
                    <h4>Id: {pokeDetail.id}</h4>
                    <img src={pokeDetail.image} alt='img not found'/>
                    <h4>HP: {pokeDetail.hp}</h4>
                    <h4>Attack: {pokeDetail.attack}</h4>
                    <h4>Defense: {pokeDetail.defense}</h4>
                    <h4>{pokeDetail.speed}</h4>
                    <h4>{pokeDetail.height}</h4>
                    <h4>{pokeDetail.weight}</h4>
                    <div>  
                        <label>
                        Types: {pokeDetail.types?.map((t,i) => (
                            <h4 key={i}>{t[0].toUpperCase() + t.slice(1)}</h4>
                        ))}
                        </label>
                    </div>
                </div>
                // : 'Pokemon Not Found'
            }
            <Link to='/home'>
                <button>Go Back</button>
            </Link>
            
        </div>
    )
}

export default DetailPokemon;