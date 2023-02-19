import React from "react";
import styles from "./Paginated.module.css";

function Paginated({
    pokemonsPerPage,
    allPokemons,
    currentPokemons,
    currentPage,
    setCurrentPage,
}) {
    const numberPages = [];
    for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
        numberPages.push(i);
    }

    const handlePagination = (num) => {
        setCurrentPage(num);
    };

    const previousPage = () => {
        currentPage > 1 && setCurrentPage(currentPage - 1);
        currentPage > 1 && handlePagination(currentPage - 1);
    };
    const nextPage = () => {
        currentPage < currentPokemons.length && setCurrentPage(currentPage + 1);
        currentPage < currentPokemons.length && handlePagination(currentPage + 1);
    };

    return (
        <div className={styles.containerPaginated}>
            <section onClick={() => previousPage()}>
                <i className={styles.iconPage}>
                    <box-icon type="solid" name="chevron-left" color="#8449b5"></box-icon>
                </i>
            </section>
            <ul>
                {numberPages?.map((num, index) => {
                    return (
                        <button
                            onClick={() => handlePagination(num)}
                            key={index}
                            className={
                                num === currentPage
                                    ? `${styles.page} ${styles.isActive}`
                                    : styles.page
                            }
                        >
                            {num}
                        </button>
                    );
                })}
            </ul>
            <section onClick={() => nextPage()}>
                <i className={styles.iconPage}>
                    <box-icon type="solid" name="chevron-right" color="#8449b5"></box-icon>
                </i>
            </section>
        </div>
    );
}

export default Paginated;
