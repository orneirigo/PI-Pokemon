import React from "react";
import { Link } from "react-router-dom";
import styles from "./CardPokemon.module.css";

const colorType = {
    bug: "#729f3f",
    dark: "#707070",
    dragon: "#ffeaa7",
    electric: "#bba909",
    fairy: "#fdb9e9",
    fighting: "#d56723",
    fire: "#ff7402",
    flying: "#3dc7ef",
    ghost: "#4d5b64",
    grass: "#9bcc50",
    ground: "#ab9842",
    ice: "#51c4e7",
    normal: "#a4acaf",
    poison: "#8b008b",
    psychic: "#f366b9",
    rock: "#a38c21",
    shadow: "#7b62a3",
    steel: "#9eb7b8",
    unknow: "#757575",
    water: "#4592c4",
};

function CardPokemon({ id, name, image, types }) {
    const pokeName = name[0].toUpperCase() + name.slice(1);
    const pokeTypes = types?.map((t) => (
        <h4 key={t}> {t[0].toUpperCase() + t.slice(1)}</h4>
    ));

    const firtStyleType = {
        background: `${colorType[types[0]]}`,
    };

    const secondStyleType = {
        background: `${colorType[types[1]]}`,
    };

    return (
        <Link to={`/home/${id}`}>
            <div className={styles.containerCard}>
                <section className={styles.cardPokemon}>
                    {
                        image ? <img className={styles.cardImage} src={image} alt={`${pokeName}`} /> : <h1>LOADING... SPIN</h1>
                    }
                </section>
                <section className={styles.cardInfo}>
                    <h2>{pokeName}</h2>
                    <div className={styles.cardTypes}>
                        <div className={styles.typeName} style={firtStyleType}>
                            {pokeTypes[0]}
                        </div>
                        <div className={styles.typeName} style={secondStyleType}>
                            {pokeTypes[1]}
                        </div>
                    </div>
                </section>
            </div>
        </Link>
    );
}

export default CardPokemon;
