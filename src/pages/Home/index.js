import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import '../../global.css';
import '../../app.css'

import ListItem from '../../components/ListItem';

function Home() {
  const [ pokemons, setPokemons ] = useState([])
  const [ load, setLoad ] = useState(true)

  useEffect(() => {
    async function loadPokemons() {
      await api.get('/pokemon/?limit=100')
      .then(response => {
        setPokemons(response.data.results)
      })
      .finally(() => {
        setLoad(false)
      })
    }

    loadPokemons()
  }, [])

  return (
    <div className="App">
      {!load &&
        <div className="pokemon-list">
          <ul>
            {pokemons.map((data) => (
              <ListItem key={data.name} pokemon={data.name} />
            ))}
          </ul>
        </div>
      }
    </div>
  );
}

export default Home;
