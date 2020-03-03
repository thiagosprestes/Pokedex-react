import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import PokemonTypesColor from '../../utils/pokemonTypesColor';

import EvolutionChain from '../../components/EvolutionChain'

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
            <div className="pokemon-data-body">             
                <div className="card">
                    <div className="card-header">
                        <h2>{pokemonData.name}</h2>
                    </div>
                    <div className="card-body">
                        <div className="pokemon-name">
                            <img src={pokemonImage} alt={pokemonData.name} />
                        </div>
                        <div className="pokemon-infos">
                            <h3>Infos</h3>
                            <div className="pokemon-infos-body">
                                <label>Height: </label>
                                <span>{pokemonData.height}</span>
                                <label>Weight: </label>
                                <span>{pokemonData.weight}</span>
                            </div>
                            <div className="pokemon-types">
                                <h3>Types</h3>
                                <div className="pokemon-types-body">
                                    {pokemonTypes.map(data => (
                                        <p key={data.type.name} style={{backgroundColor: PokemonTypesColor[data.type.name]}}>{data.type.name}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="pokemon-abilities">   
                            <h3>Stats</h3>                     
                            <div className="pokemon-stats">
                                {pokemonStats.map(data => (
                                    <div key={data.stat.name} className="stat-info">
                                        <span className="stat-name">{data.stat.name}</span>
                                        <span className="stat-level">{data.base_stat}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card evolution-chain">
                    <div className="card-header">
                        <h2>Evolution chain</h2>
                        <EvolutionChain pokemon={match.params.pokemonNumber} />
                    </div>
                </div>
            </div>
            }
        </>
    )
}

export default Pokemon;