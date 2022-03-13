import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';
import PokemonLogo from '../../images/Pokelogo.png';
import Pokebola from '../../images/Pokebola.png'

function landingPage () {
    return (
        <div className={styles.landingPage}>
            <div className={styles.imgLogo}>
                 <img src={PokemonLogo}  alt='Logo not found' width='750px' />
            </div>
                <Link to='/home' className={styles.pokebola}>
                    <img src={Pokebola} alt='Pikachu not found' width='170px'/>
                    <br/>
                    <h3>Go Home!</h3>
                </Link>
        </div>
    )
}

export default landingPage;