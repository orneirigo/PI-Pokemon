import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css'

function landingPage () {
    return (
        <div className={styles.background}>
            <h1 className={styles.background}>Pokemon Page!</h1>
            <Link to='/home'>
                <button className={styles.button}>GO POKEMON!</button>
            </Link>
        </div>
    )
}

export default landingPage;