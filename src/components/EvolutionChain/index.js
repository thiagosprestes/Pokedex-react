import React, { useState, useEffect } from 'react';

import api from '../../services/api'

import pokemonImages from '../../utils/pokemonImages'

import './style.css'

function EvolutionChain({ pokemon }) {
    const [ actualEvolution, setActualEvolution] = useState([])
    const [ evolutions, setEvolutions ] = useState([])

    const pokemonDefaultImage = (pokemonName) => {
        return pokemonImages.getSprite(pokemonName)
    }
    
    useEffect(() => {
        async function loadEvolutions() {
            const response = await api.get(`/evolution-chain/${pokemon}`)

            setActualEvolution(response.data.chain.species.name)
            setEvolutions(response.data.chain.evolves_to)
        }

        loadEvolutions()
    }, [])

    return (
        <>
            {evolutions.map(second => (                
                <div key={second.species.name} className="evolutions">    
                    <div className="next-evolution">
                        <img src={pokemonDefaultImage(actualEvolution)} alt={actualEvolution} />
                        <span>{actualEvolution}</span>
                    </div>                
                    <div className="next-evolution">
                        <img src={pokemonDefaultImage(second.species.name)} alt={second.species.name} />
                        <span>{second.species.name}</span>
                    </div>
                    {second.evolves_to.map(third => (
                        <div className="next-evolution">
                            <img src={pokemonDefaultImage(third.species.name)} alt={third.species.name} />
                            <span key={third.species.name}>{third.species.name}</span>
                        </div>
                    ))}
                </div>
            ))}
        </>
    )
}

export default EvolutionChain;