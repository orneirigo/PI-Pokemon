import React from "react";
import PikachuSleep from "../../images/PikachuSleep.png";
import styles from "./Loading.module.css";

function Loading() {

    return (
        <div className={styles.containerIsLoading}>
            <strong>Loading...</strong>
            <p>Maybe the pokemon was not found!</p>
            <img src={PikachuSleep} alt="Pikachu Sleeping" />
        </div>
    );
}

export default Loading;