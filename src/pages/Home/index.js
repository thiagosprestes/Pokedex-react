import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import '../../global.css';
import '../../app.css'

import ListItem from '../../components/ListItem';

function Home() {
  const [ pokemons, setPokemons ] = useState([])

  useEffect(() => {
    async function loadPokemons() {
      const response = await api.get('/pokemon')

      setPokemons(response.data.results)
    }

    loadPokemons()
  }, [])

  return (
    <div className="App">
      <div className="pokemon-list">
        <ul>
          {pokemons.map((data) => (
            <ListItem key={data.name} pokemon={data.name} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
