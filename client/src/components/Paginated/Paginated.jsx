import React from 'react';

function Paginated ({allPokemons, pokemonsPerPage, handlePagination}) {
    const numberPages = []
    for (let i= 1; i <= Math.ceil(allPokemons/pokemonsPerPage); i++) {
        numberPages.push(i)
    }
    return (
        <nav>
            <ul>
                {numberPages?.map(num => {
                    return (
                        <button onClick={() => handlePagination(num)} key={num}>{num}</button>
                )})
                }
            </ul>
        </nav>
    )
}

export default Paginated;