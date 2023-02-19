import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../images/Logo.png";
import Pokeball from "../../images/Pokeball.png";
import Pikachu3D from "../../images/Pikachu3D.png";
import styles from "./LandingPage.module.css";

function LandingPage() {
    return (
        <div className={styles.containerLandingPage}>
            <section className={styles.logoAndAccess}>
                <img src={Logo} alt="Logo" />
                <Link to="/home" className={styles.accessPokeball}>
                    <img src={Pokeball} alt="Pokeball" />
                    <h1>Go to catch them all!</h1>
                </Link>
            </section>
            <section className={styles.imgPikachu}>
                <img src={Pikachu3D} alt="Pikachu3D" />
            </section>
        </div>
    );
}

export default LandingPage;
