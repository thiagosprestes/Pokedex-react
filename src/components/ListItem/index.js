import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import api from '../../services/api';

import './style.css';

function ListItem({ pokemon }) {
    const [ pokemonData, setPokemonData ] = useState([])
    const [ pokemonImage, setPokemonImage ] = useState('')

    useState(() => {
        async function loadPokemonData() {
            const response = await api.get(`/pokemon/${pokemon.name}`)
    
            setPokemonData(response.data)

            setPokemonImage(response.data.sprites.front_default)
        }

        loadPokemonData()
    }, [])

    return (
        <Link to={`/pokemon/${pokemonData.id}`} >
            <li>
                <img src={pokemonImage} alt={pokemon.name} />
                <p className="pokemon-name">{pokemon.name}</p>
                <p className="pokemon-number">Number: {pokemonData.id}</p>
            </li>
        </Link>
    )
}

export default ListItem;