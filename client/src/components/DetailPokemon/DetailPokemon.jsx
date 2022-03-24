import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link , useParams } from "react-router-dom";
import { getPokemonsId, clearState } from '../../actions';
import styles from './DetailPokemon.module.css';

function DetailPokemon () {
    const dispatch = useDispatch()
    const params = useParams()

    useEffect(() => {
        dispatch(getPokemonsId(params.id))
        dispatch(clearState())
    }, [dispatch, params.id])

    const pokeDetail = useSelector(state => state.pokemonDetail)

    return (
        <div className={styles.detailBackground}>
            <div>
                <Link to='/home'>
                    <button className={styles.button}>Go back!</button>
                </Link>
                    <div className={styles.detailPokemon}>
                        <div className={styles.namePokemon}>
                            <h1>{pokeDetail.name}</h1> 
                        </div>
                        <div className={styles.idPokemon}>
                            <p>ID: {pokeDetail.id}</p>
                        </div>
                        <div className={styles.imagePokemon}>
                            <img src={pokeDetail.image} alt='img not found' width='280px'/>
                        </div>
                        <div className={styles.detailStats}>  
                            <h3>
                                {pokeDetail.types?.map((t,i) => (
                                <span key={i}>{t[0].toUpperCase() + t.slice(1) + '/'}</span>
                            ))}
                            </h3>
                        </div>
                        <hr/>
                        <div className={styles.detailStats}>
                            <h3>HP:{pokeDetail.hp}</h3>
                            <h3>Speed: {pokeDetail.speed}</h3>
                        </div>
                        <hr/>
                        <div className={styles.detailStats}>
                            <h3>Attack: {pokeDetail.attack}</h3>
                            <h3>Defense: {pokeDetail.defense}</h3>
                        </div>
                        <hr/>
                        <div className={styles.detailStats}>
                            <h3>Height: {pokeDetail.height}</h3>
                            <h3>Weight: {pokeDetail.weight}</h3>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default DetailPokemon;