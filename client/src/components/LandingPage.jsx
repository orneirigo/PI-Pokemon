import React from 'react';
import { Link } from 'react-router-dom';

function landingPage () {
    return (
        <div>
            <h1>Pokemon Page!</h1>
            <Link to='/home'>
                <button>GO POKEMON!</button>
            </Link>
        </div>
    )
}

export default landingPage;