import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import api from '../../services/api';

import './style.css';

import pokemonTypeColor from '../../utils/pokemonTypesColor'

function ListItem({ pokemon }) {
    const [ pokemonData, setPokemonData ] = useState([])
    const [ pokemonImage, setPokemonImage ] = useState('')
    const [ pokemonTypes, setPokemonTypes ] = useState([])

    useEffect(() => {
        async function loadPokemonData() {
            const response = await api.get(`/pokemon/${pokemon}`)
    
            setPokemonData(response.data)

            setPokemonImage(response.data.sprites.front_default)

            setPokemonTypes(response.data.types)
        }

        loadPokemonData()
    }, [])

    return (
        <Link to={`/pokemon/${pokemonData.id}`} >
            <li>
                <img src={pokemonImage} alt={pokemonData.name} />
                <p className="pokemon-name">{pokemonData.name}</p>
                <div className="pokemon-types">
                    {pokemonTypes.map(data => (
                        <p key={data.type.name} style={{backgroundColor: pokemonTypeColor[data.type.name] }}>{data.type.name}</p>
                    ))}
                </div>
            </li>
        </Link>
    )
}

export default ListItem;