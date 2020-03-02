import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import PokemonTypesColor from '../../utils/pokemonTypesColor';

import './style.css';

function Pokemon({ match }) {
    const [ pokemonData, setPokemonData ] = useState([])
    const [ pokemonImage, setPokemonImage ] = useState('')
    const [ pokemonTypes, setPokemonTypes ] = useState([])
    const [ pokemonStats, setPokemonStats ] = useState([])

    const [ load, setLoad ] = useState(true)

    useEffect(() => {
        async function loadPokemonData() {
            await api.get(`/pokemon/${match.params.pokemonNumber}`)
            .then(response => {
                setPokemonData(response.data)

                setPokemonImage(response.data.sprites.front_default)

                setPokemonTypes(response.data.types)

                setPokemonStats(response.data.stats)
            })
            .finally(() => {
                setLoad(false)
            })
        }

        loadPokemonData()
    }, [])

    return(
        <>
            {!load && 
                <div className="card">
                    <div className="pokemon-name">
                        <h2>{pokemonData.name}</h2>
                        <img src={pokemonImage} alt={pokemonData.name} />
                        <div className="pokemon-types">
                            {pokemonTypes.map(data => (
                                <p style={{backgroundColor: PokemonTypesColor[data.type.name]}}>{data.type.name}</p>
                            ))}
                        </div>
                    </div>
                    <div className="pokemon-abilities">                        
                        <div className="pokemon-stats">
                            {pokemonStats.map(data => (
                                <div className="stat-info">
                                    <span className="stat-name">{data.stat.name}</span>
                                    <span className="stat-level">{data.base_stat}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Pokemon;