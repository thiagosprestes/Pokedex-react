import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import pokemonImages from '../../utils/pokemonImages';

import pokemonEvolutions from '../../utils/pokemonEvolutions';

import './style.css';

export default function EvolutionChain({ pokemonName }) {
    const [evolutions, setEvolutions] = useState([]);

    const [load, setLoad] = useState(true);

    function pokemonDefaultImage (data) {
        return pokemonImages.getSprite(data);
    }

    useEffect(() => {
        function pokemonEvoChain(){
            const pokemon = pokemonEvolutions.getChain(pokemonName);
    
            return pokemon.chain;
        }
        
        async function loadEvolutions() {
            await api.get(`/evolution-chain/${pokemonEvoChain()}`)
            .then(response => {
                setEvolutions(response.data.chain);
            })
            .finally(() => {
                setLoad(false);
            });
        }
        
        loadEvolutions();
    }, [pokemonName]);

    return (
        <>
            {!load && (
                <div className="evolutions">  
                    <div className="next-evolution">
                        <img 
                            src={pokemonDefaultImage(evolutions.species.name)} 
                            alt={evolutions.species.name} 
                        />
                        <span>{evolutions.species.name}</span>
                    </div>     
                    {evolutions.evolves_to.map(second => (   
                        <React.Fragment key={second.species.name}>                                                 
                            <div className="next-evolution">
                                <img src={pokemonDefaultImage(second.species.name)} alt={second.species.name} />
                                <span>{second.species.name}</span>
                            </div>
                            {second.evolves_to.map(third => (
                                <div key={third.species.name} className="next-evolution">
                                    <img src={pokemonDefaultImage(third.species.name)} alt={third.species.name} />
                                    <span key={third.species.name}>{third.species.name}</span>
                                </div>
                            ))}
                        </React.Fragment>
                    ))}
                </div>                
            )}
        </>
    );
}
