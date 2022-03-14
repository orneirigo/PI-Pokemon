import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CardPokemon.module.css';

function CardPokemon ({id, name, image, types}) {
    const pokeName = name[0].toUpperCase() + name.slice(1)
    const pokeTypes = types?.map(t => <h4 key={t}> {t[0].toUpperCase() + t.slice(1)}</h4>)
    return (
        <div className={styles.card}>
                <h2 className={styles.name}>{pokeName}</h2>
                    <div className={styles.fondo}>
                        <Link to={`/home/${id}`}>
                            <img className={styles.image} src={image} alt='Img not found!' width='250px'/>
                        </Link>
                    </div>
                    <div className={styles.types}>{pokeTypes}</div>
        </div>
    )
}

export default CardPokemon;