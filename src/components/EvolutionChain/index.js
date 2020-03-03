import React, { useState, useEffect } from 'react';

import api from '../../services/api'

import pokemonImages from '../../utils/pokemonImages'

import './style.css'

function EvolutionChain({ pokemon }) {
    const [ secondEvolution, setSecondEvolution ] = useState([])

    const pokemonDefaultImage = (pokemonName) => {
        return pokemonImages.getSprite(pokemonName)
    }
    
    useEffect(() => {
        async function loadEvolutions() {
            const response = await api.get(`/evolution-chain/${pokemon}`)

            setSecondEvolution(response.data.chain.evolves_to)
        }

        loadEvolutions()
    }, [])

    return (
        <>
            {secondEvolution.map(second => (
                <div key={second.species.name} className="evolutions">                    
                    <div className="evolution-two">
                        <img src={pokemonDefaultImage(second.species.name)} alt={second.species.name} />
                        <h1>{second.species.name}</h1>
                    </div>
                    {second.evolves_to.map(third => (
                        <div className="evolution-three">
                            <img src={pokemonDefaultImage(third.species.name)} alt={third.species.name} />
                            <h1 key={third.species.name}>{third.species.name}</h1>
                        </div>
                    ))}
                </div>
            ))}
        </>
    )
}

export default EvolutionChain;