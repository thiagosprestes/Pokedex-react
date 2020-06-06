import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import PokemonTypesColor from '../../utils/pokemonTypesColor';

import EvolutionChain from '../../components/EvolutionChain';

import './style.css';

export default function Pokemon({ match }) {
    const [pokemon, setPokemon] = useState([]);

    const [load, setLoad] = useState(true);

    useEffect(() => {
        api.get(`/pokemon/${match.params.pokemonNumber}`)
        .then(response => {
            setPokemon(response.data);
        })
        .finally(() => {
            setLoad(false);
        })
    }, [match.params.pokemonNumber]);

    return(
        <>
            {!load &&
                <div className="pokemon-data-body">             
                    <div className="card">
                        <div className="card-header">
                            <h2>{pokemon.name}</h2>
                        </div>
                        <div className="card-body">
                            <div className="pokemon-name">
                                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                            </div>
                            <div className="pokemon-infos">
                                <h3>Infos</h3>
                                <div className="pokemon-infos-body">
                                    <label>Height: </label>
                                    <span>{pokemon.height}</span>
                                    <label>Weight: </label>
                                    <span>{pokemon.weight}</span>
                                </div>
                                <div className="pokemon-types">
                                    <h3>Types</h3>
                                    <div className="pokemon-types-body">
                                        {pokemon.types.map(data => (
                                            <p key={data.type.name} style={{backgroundColor: PokemonTypesColor[data.type.name]}}>{data.type.name}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="pokemon-abilities">   
                                <h3>Stats</h3>                     
                                <div className="pokemon-stats">
                                    {pokemon.stats.map(data => (
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
                        </div>
                        <div className="evolutions-list">
                            <EvolutionChain pokemonName={pokemon.name} />
                        </div>
                    </div>
                </div>
            }
        </>
    );
}
