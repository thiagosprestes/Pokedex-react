import React, { useState, useEffect } from 'react';

import api from '../../services/api'

import pokemonImages from '../../utils/pokemonImages'

import pokemonEvolutions from '../../utils/pokemonEvolutions'

import './style.css'

function EvolutionChain({ pokemonName }) {
    const [ firstEvolution, setFirstEvolution ] = useState([])
    const [ evolutions, setEvolutions ] = useState([])

    function pokemonDefaultImage (data) {
        return pokemonImages.getSprite(data)
    }
    
    function pokemonEvoChain(){
        const pokemon = pokemonEvolutions.getChain(pokemonName)

        return pokemon.chain
    }

    useEffect(() => {
        async function loadEvolutions() {
            const response = await api.get(`/evolution-chain/${pokemonEvoChain()}`)
            setFirstEvolution(response.data.chain.species.name)
            setEvolutions(response.data.chain.evolves_to)
        }

        loadEvolutions()
    }, [])

    return (
        <>
            {evolutions.map(second => (                
                <div key={second.species.name} className="evolutions">   
                    <div className="next-evolution">
                        <img src={pokemonDefaultImage(firstEvolution)} alt={firstEvolution} />
                        <span>{firstEvolution}</span>
                    </div>                
                    <div className="next-evolution">
                        <img src={pokemonDefaultImage(second.species.name)} alt={second.species.name} />
                        <span>{second.species.name}</span>
                    </div>
                    {second.evolves_to.map(third => (
                        <div key={third.species.name} className="next-evolution">
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