import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import '../../global.css';
import './style.css'

import ListItem from '../../components/ListItem';

function Home() {
  const [ pokemons, setPokemons ] = useState([])
  const [ next, setNext ] = useState('')
  const [ previous, setPrevious ] = useState('')

  const [ load, setLoad ] = useState(true)

  useEffect(() => {
    async function loadPokemons() {
      await api.get('/pokemon/?limit=30')
      .then(response => {
        setPokemons(response.data.results)
        setNext(response.data.next)
      })
      .finally(() => {
        setLoad(false)
      })
    }

    loadPokemons()
  }, [])

  async function loadNext() {
    const nextPageUrl = next.replace('https://pokeapi.co/api/v2', '')

    const response = await api.get(nextPageUrl)

    setPokemons(response.data.results)

    setNext(response.data.next)

    setPrevious(response.data.previous)
  }

  async function loadPrevious() {
    const previousPageUrl = previous.replace('https://pokeapi.co/api/v2', '')

    const response = await api.get(previousPageUrl)

    setPokemons(response.data.results)

    setNext(response.data.next)

    setPrevious(response.data.previous)
  }

  return (
    <div className="App">
      {!load &&
        <div className="pokemon-list">
          <ul>
            {pokemons.map((data) => (
              <ListItem key={data.name} pokemon={data.name} />
            ))}
          </ul>
          <div className="pagination">          
            {previous && <button onClick={loadPrevious}>Previous</button>}
            {next && <button onClick={loadNext}>Next</button>}
          </div>
        </div>
      }
    </div>
  );
}

export default Home;
