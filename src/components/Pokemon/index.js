import React from 'react';

function Pokemon({ match }) {
    return(
        <h1>{match.params.pokemonNumber}</h1>
    )
}

export default Pokemon;