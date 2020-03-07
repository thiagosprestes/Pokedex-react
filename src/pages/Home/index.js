import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import '../../global.css';
import './style.css'

import ListItem from '../../components/ListItem';

function Home() {
  const [ pokemons, setPokemons ] = useState([])
  const [ next, setNext ] = useState('')
  const [ previous, setPrevious ] = useState('')

  const [ searchTerm, setSearchTerm ] = useState('')
  const [ searchResults, setSearchResults ] = useState([])

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
    setLoad(true)
    
    const nextPageUrl = next.replace('https://pokeapi.co/api/v2', '')

    await api.get(nextPageUrl)
    .then(response => {
      setPokemons(response.data.results)

      setNext(response.data.next)

      setPrevious(response.data.previous)
    })
    .finally(() => {
      setLoad(false)
    })

  }

  async function loadPrevious() {
    setLoad(true)

    const previousPageUrl = previous.replace('https://pokeapi.co/api/v2', '')

    await api.get(previousPageUrl)
    .then(response => {
      setPokemons(response.data.results)

      setNext(response.data.next)

      setPrevious(response.data.previous)
    })
    .finally(() => {
      setLoad(false)
    })
  }

  useEffect(() => {
    const filteredData = pokemons.filter(data => data.name == searchTerm)

    setSearchResults(filteredData)
  }, [searchTerm])

  return (
    <div className="App">
      {!load &&
        <div className="pokemon-list">
          <div className="search-input">
            <label htmlFor="search">Search:</label>
            <input type="text" name="search" id="search" placeholder="Ex: Pikachu" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
          {searchResults !== 0 && 
              <ul>
                {searchResults.map((data) => (
                  <ListItem key={data.name} pokemon={data.name} />
                ))}
              </ul>
          }
          {searchTerm == 0 && 
            <>
              <ul>
                {pokemons.map((data) => (
                  <ListItem key={data.name} pokemon={data.name} />
                ))}
              </ul>
              <div className="pagination">          
                {previous && <button onClick={loadPrevious}>Previous</button>}
                {next && next != 'https://pokeapi.co/api/v2/pokemon/?offset=150&limit=30' && (<button onClick={loadNext}>Next</button>)}
              </div>
            </>
          }
        </div>
      }
    </div>
  );
}

export default Home;
