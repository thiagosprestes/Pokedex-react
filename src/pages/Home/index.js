import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import '../../global.css';
import './style.css';

import ListItem from '../../components/ListItem';

export default function Home() {
  const [ pokemons, setPokemons ] = useState([]);
  const [ next, setNext ] = useState('');
  const [ previous, setPrevious ] = useState('');

  const [ searchTerm, setSearchTerm ] = useState('');
  const [ filteredPokemons, setFilteredPokemons ] = useState('');

  const [ load, setLoad ] = useState(true);

  useEffect(() => {
    api.get('/pokemon/?limit=30')
      .then(response => {
        setPokemons(response.data.results);
        setNext(response.data.next);
      })
      .finally(() => {
        setLoad(false);
      })
  }, []);

  async function loadNext() {
    setLoad(true);
    
    const nextPageUrl = next.replace('https://pokeapi.co/api/v2', '');

    await api.get(nextPageUrl)
    .then(response => {
      setPokemons(response.data.results);

      setNext(response.data.next);

      setPrevious(response.data.previous);
    })
    .finally(() => {
      setLoad(false);
    });
  }

  async function loadPrevious() {
    setLoad(true);

    const previousPageUrl = previous.replace('https://pokeapi.co/api/v2', '');

    await api.get(previousPageUrl)
    .then(response => {
      setPokemons(response.data.results);

      setNext(response.data.next);

      setPrevious(response.data.previous);
    })
    .finally(() => {
      setLoad(false);
    });
  }
  
  useEffect(() => {
    function filterPokemons() {
        if(searchTerm === '') {
            setFilteredPokemons([]);
        } else {
            const filteredData = pokemons.filter((pokemon) => {
                return pokemon.name.includes(searchTerm);
            });
            
            return setFilteredPokemons(filteredData);
        }
    }

    filterPokemons()
  }, [pokemons, searchTerm])

  return (
    <div className="App">
      {!load &&
        <div className="pokemon-list">
          <div className="search-input">
            <label htmlFor="search">Search:</label>
            <input 
              type="text" 
              name="search" 
              id="search" 
              placeholder="Ex: Pikachu" 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)} 
            />
          </div>
          {filteredPokemons.length === 0 ? (
            <ul>
                {pokemons.map((data) => (
                    <ListItem key={data.name} pokemonName={data.name} />
                ))}
            </ul>
            ) : (
            <ul>
                {filteredPokemons.map((data) => (
                    <ListItem key={data.name} pokemonName={data.name} />
                ))}
            </ul>
          )}
          <div className="pagination">          
            {previous && (
              <button onClick={loadPrevious}>Previous</button>
            )}
            {next && next !== 'https://pokeapi.co/api/v2/pokemon/?offset=150&limit=30' && (
              <button onClick={loadNext}>Next</button>
            )}
          </div>
        </div>
      }
    </div>
  );
}
