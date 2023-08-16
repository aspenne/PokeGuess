import React from 'react';
import spriteImages from './sprites';
import types from '../assets/images/types/bug.svg';

interface PokemonCardProps {
  type: string;
  type2: string;
  name: string;
  pokedexID: string;
}

function PokemonCard({ type, type2, name, pokedexID }: PokemonCardProps){
  const imageIndex = parseInt(pokedexID) - 1;
  const imageUrl = spriteImages[imageIndex];
  const primaryTypeClass = `type-${type}`;

  return (
    <section className='pokemonCard'>
      <article className='nameType'>
        <div className="types">
          <img src={`/src/assets/images/types/${type}.svg`} alt={type} />
          {type2 && <img src={`/src/assets/images/types/${type2}.svg`} alt={type2} />}
        </div>
        <h3>{name}</h3>
      </article>
      <img className='pokemon' src={imageUrl} alt={`pokemon number ${imageUrl}`}/>
      <button className={primaryTypeClass}> En savoir plus</button>
    </section>
  );
}

export default PokemonCard;
