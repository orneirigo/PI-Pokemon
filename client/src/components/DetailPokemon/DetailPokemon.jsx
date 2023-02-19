import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getPokemonsId, clearState } from "../../actions";
import MoonLoader from "react-spinners/MoonLoader";
import styles from "./DetailPokemon.module.css";

function DetailPokemon() {
    const dispatch = useDispatch();
    const { id } = useParams();

    const pokeDetail = useSelector((state) => state.pokemonDetail);

    useEffect(() => {
        dispatch(getPokemonsId(id));
        dispatch(clearState());
    }, [dispatch, id]);

    return (
        <div className={styles.containerDetail}>
            <div className={styles.infoDetail}>
                <div className={styles.cardPokemon}>
                    {
                        pokeDetail.name ?
                            <>
                                <section className={styles.idNamePokemon}>
                                    <h1>
                                        N°{pokeDetail.id} | {pokeDetail.name}
                                    </h1>
                                    <Link to="/home" className={styles.iconBack}>
                                        <box-icon name="arrow-back" size="sm"></box-icon>
                                    </Link>
                                </section>
                                <section className={styles.imagePokemon}>
                                    <img src={pokeDetail.image} alt={pokeDetail.name} />
                                </section>
                                <section className={styles.typesPokemon}>
                                    {pokeDetail?.types?.length === 1 && <h3>{pokeDetail.types[0]}</h3>}
                                    {pokeDetail?.types?.length > 1 && (
                                        <h3>{`${pokeDetail.types[0]} - ${pokeDetail.types[1]}`}</h3>
                                    )}
                                </section>
                                <hr />
                                <section className={styles.statsPokemon}>
                                    <p>HP: {pokeDetail.hp}</p>
                                    <p>Speed: {pokeDetail.speed}</p>
                                </section>
                                <hr />
                                <section className={styles.statsPokemon}>
                                    <p>Attack: {pokeDetail.attack}</p>
                                    <p>Defense: {pokeDetail.defense}</p>
                                </section>
                                <hr />
                                <section className={styles.statsPokemon}>
                                    <p>Height: {pokeDetail.height}</p>
                                    <p>Weight: {pokeDetail.weight}</p>
                                </section>
                            </>
                            :
                            <div className={styles.loading}>
                                <MoonLoader
                                    color="#21212A"
                                    size={180}
                                />
                            </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default DetailPokemon;
