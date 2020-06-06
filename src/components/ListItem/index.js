import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import api from '../../services/api';

import './style.css';

import pokemonTypeColor from '../../utils/pokemonTypesColor';

export default function ListItem({ pokemonName }) {
    const [pokemon, setPokemon] = useState([]);
    const [load, setLoad] = useState(true);

    useEffect(() => {
        api.get(`/pokemon/${pokemonName}`)
        .then(response => {
            setPokemon(response.data);
        })
        .finally(() => {
            setLoad(false);
        });
    }, [pokemonName]);

    return (
        <Link to={`/pokemon/${pokemon.id}`} >
            {!load &&
                <li>
                    <img 
                        src={pokemon.sprites.front_default} 
                        alt={pokemon.name} 
                    />
                    <p className="pokemon-name">{pokemon.name}</p>
                    <div className="pokemon-types">
                        {pokemon.types.map(data => (
                            <p 
                                key={data.type.name} 
                                style={{backgroundColor: pokemonTypeColor[data.type.name] }}
                            >
                                {data.type.name}
                            </p>
                        ))}
                    </div>
                </li>
            }
        </Link>
    );
}
