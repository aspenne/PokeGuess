import React, { useState, useEffect } from 'react'
import medium from '../assets/images/icons/medium.svg'
import redArrowDown from '../assets/images/icons/redArrowDown.svg'
import redArrowUp from '../assets/images/icons/redArrowUp.svg'
import redCross from '../assets/images/icons/redCross.svg'
import valid from '../assets/images/icons/valid.svg'

function zeroFill(number:number) {
  return String(number).padStart(4, '0');
}

interface PokemonData {
  type_1_name: string;
  type_2_name: string | null;
  talent_1_name: string | null;
  talent_2_name: string | null;
  talent_3_name: string | null;
  pokedexId: number;
  hp: number;
  atk: number;
  def: number;
  spe_atk: number;
  spe_def: number;
  vit: number;
  stade: number;
  gen: number;
}

export default function GuessBar({ id }: { id: number }) {
  // const [pokemons, setPokemons] = useState<PokemonData[]>([])
  const [pokemonToGuess, setPokemonToGuess] = useState<PokemonData | never[]>([])
  const [pokemons, setPokemons] = useState<PokemonData[]>(() => {
    const saved = localStorage.getItem("pokemonsStorage");
    const initialValue = saved ? JSON.parse(saved) : [];
    return initialValue || "";
  });

  useEffect(() => {
    localStorage.setItem('pokemonsStorage', JSON.stringify(pokemons))
  }, [pokemons])

  useEffect(() => {
    fetch(`/api/PkmnsClassic/${id}`)
      .then(response => response.json())
      .then(data => {
        setPokemons(prevPokemons => [...prevPokemons, ...data]);
      })
      .catch(error => {
        console.error('/api Error (api/PkmnClassic): ', error);
      });
  }, [id]);

  useEffect(() => {
    fetch(`/api/PkmnsClassic/7`)
      .then(response => response.json())
      .then(data => {
        setPokemonToGuess(data[0]);
      })
      .catch(error => {
        console.error('/api Error (api/PkmnClassic): ', error);
      });
  }, []);

  function lowerOrHigher(stat: number, statName: string): string {
    let returnValue: string;
    
    if (stat < pokemonToGuess[statName]) {
      returnValue = redArrowUp;
    } else if (stat > pokemonToGuess[statName]) {
      returnValue = redArrowDown;
    } else {
      returnValue = valid;
    }
    
    return returnValue;
  }

  function typeValid(type:string | null, typeToGuess:string | null): string{
    if ( type == typeToGuess){
      return valid;
    }
    else{
      return redCross;
    }
  }

  return (
    <section className='guess-bar'>
      <ul className='info-bar'>
        <li>Pokemon</li>
        <li>Type 1</li>
        <li>Type 2</li>
        <li>Talent</li>
        <li>Hp</li>
        <li>Atk</li>
        <li>Def</li>
        <li>Atk Spe</li>
        <li>Def Spe</li>
        <li>Speed</li>
        <li>Stade</li>
        <li>Gen</li>
      </ul>
      <ul className='pokemons'>
      {pokemons.map((pokemon, index) => (
        <div key={index} className={'pokemonBox'}>
          <li>
            <img src={`/src/assets/images/spritesPixel/${zeroFill(Number(pokemon.pokedexId))}.jpg`} alt=''/>
          </li>
          <li>
            <img src={`/src/assets/images/types/${pokemon.type_1_name}.svg`} alt={pokemon.type_1_name} />
            <img src={ pokemonToGuess && typeValid(pokemon.type_1_name, pokemonToGuess.type_1_name)} alt="marker" />
          </li>
          <li>
            {pokemon.type_2_name && <img src={`/src/assets/images/types/${pokemon.type_2_name}.svg`} alt={pokemon.type_2_name} />} 
            {<img src={ pokemonToGuess && typeValid(pokemon.type_2_name, pokemonToGuess.type_2_name)} alt="marker" />}            
          </li>
          <li>
            <p>
            {pokemon.talent_1_name ? pokemon.talent_1_name : 'No Talents'} 
            {pokemon.talent_3_name && ' / ' + pokemon.talent_2_name } 
            {pokemon.talent_3_name && ' / ' + pokemon.talent_2_name } 
            </p>
          </li>
          <li>
            {pokemon.hp}
            <img src={ lowerOrHigher(pokemon.hp, 'hp')} alt="marker" />
          </li>
          <li>
            {pokemon.atk}
            <img src={ lowerOrHigher(pokemon.atk, 'atk')} alt="marker" />

          </li>
          <li>
            {pokemon.def}
            <img src={ lowerOrHigher(pokemon.def, 'def')} alt="marker" />
          </li>
          <li>
            {pokemon.spe_atk}
            <img src={ lowerOrHigher(pokemon.spe_atk, 'spe_atk')} alt="marker" />

          </li>
          <li>
            {pokemon.spe_def}
            <img src={ lowerOrHigher(pokemon.spe_def, 'spe_def')} alt="marker" />
          </li>
          <li>
            {pokemon.vit}
            <img src={ lowerOrHigher(pokemon.vit, 'vit')} alt="marker" />
          </li>
          <li>
            {pokemon.stade}
            <img src={ lowerOrHigher(pokemon.stade, 'stade')} alt="marker" />
          </li>
          <li>
            {pokemon.gen}
            <img src={ lowerOrHigher(pokemon.gen, 'gen')} alt="marker" />
          </li>
        </div>
        )).reverse()}
      </ul>
    </section>
  )
}
