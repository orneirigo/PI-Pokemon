import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import Logo from "../../images/Logo.png";
import styles from "./NavBar.module.css";

function NavBar({
    allTypes,
    handleFilterByOrigin,
    handleFilterByTypes,
    handleOrderBy,
    handleReload,
    children
}) {
    const [responsiveNavBar, setResponsiveNavBar] = useState(false);

    const handleClickNavBar = () => {
        setResponsiveNavBar(!responsiveNavBar);
    };

    return (
        <nav className={styles.containerNavBar}>
            <section>
                <Link to="/home" onClick={handleReload}>
                    <img src={Logo} className={styles.logo} alt="Logo" />
                </Link>
            </section>
            <section
                className={responsiveNavBar ? `${styles.items} ${styles.isResponsive}` : styles.items}>
                <Link className={styles.link} to="/createdPokemon">
                    Create
                </Link>
                <select onChange={handleFilterByTypes} className={styles.selectTypes} defaultValue="allTypes">
                    <option className={styles.option} value="allTypes">Select Type</option>
                    <option className={styles.option} value="allTypes">
                        All Types
                    </option>
                    {allTypes?.map((t) => (
                        <option className={styles.option} value={t.name} key={t.id}>
                            {t.name.charAt(0).toUpperCase() + t.name.slice(1)}
                        </option>
                    ))}
                    Select Type
                </select>
                <select onChange={handleFilterByOrigin} className={styles.selectOrigin} defaultValue="allPokes">
                    <option className={styles.option} value="allPokes">Filter by</option>
                    <option className={styles.option} value="allPokes">
                        All
                    </option>
                    <option className={styles.option} value="API">
                        Originals
                    </option>
                    <option className={styles.option} value="DB">
                        Created
                    </option>
                </select>
                <select onChange={handleOrderBy} className={styles.selectOrder} defaultValue="allPokes">
                    <option className={styles.option} value="allPokes">Order by</option>
                    <option className={styles.option} value="allPokes">
                        All
                    </option>
                    <option className={styles.option} value="nameA-Z">
                        A-Z
                    </option>
                    <option className={styles.option} value="nameZ-A">
                        Z-A
                    </option>
                    <option className={styles.option} value="attackAsc">
                        - attack +
                    </option>
                    <option className={styles.option} value="attackDes">
                        + attack -
                    </option>
                </select>
                {children}
            </section>
            <div className={styles.responsive} onClick={handleClickNavBar}>
                <box-icon
                    name={responsiveNavBar ? "chevrons-right" : "menu"}
                    color="white"
                    size="lg"
                ></box-icon>
            </div>
        </nav>
    );
}

export default NavBar;
