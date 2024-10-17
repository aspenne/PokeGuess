import { useEffect, useState } from 'react'
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
  talent_1_name: string;
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
  generation: number;
  positionId: number;
}

interface talents {
  talent_1: string;
  talent_2: string | null;
  talent_3: string | null;
}

interface Props {
  id: number;
  onData: (data: PokemonData[]) => void;
}

export default function GuessBarClassic({ id, onData }:Props) {
  const [pokemonToGuess, setPokemonToGuess] = useState<PokemonData | undefined>()
  const [pokemons, setPokemons] = useState<PokemonData[]>(() => {
    const saved = localStorage.getItem("pokemonsStorageClassic");
    const initialValue = saved ? JSON.parse(saved) : [];
    const uniquePokemons = initialValue.filter((item:PokemonData, index:number, self:PokemonData[]) =>
      self.findIndex(p => p.pokedexId === item.pokedexId) === index
    );
    return uniquePokemons;
  });

  useEffect(() => {
    const sortedAndReversedPokemons = [...pokemons].sort((a, b) => a.positionId - b.positionId);
    localStorage.setItem('pokemonsStorageClassic', JSON.stringify(sortedAndReversedPokemons))
    onData(sortedAndReversedPokemons); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemons])

  useEffect(() => {
    fetch(`http://pokeguess.fr:3000/api/PkmnClassic/${id}`)
      .then(response => response.json())
      .then(data => {
        const newData = data.map((newPokemon: PokemonData, index: number) => ({
          ...newPokemon,
          positionId: pokemons.length + index + 1,
        }));
        setPokemons(prevPokemons => [...prevPokemons, ...newData]);
      })
      .catch(error => {
        console.error('/api Error (api/PkmnClassic): ', error);
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    fetch(`http://pokeguess.fr:3000/api/PkmnClassicDaily`)
      .then(response => response.json())
      .then(data => {
        setPokemonToGuess(data[0]);
      })
      .catch(error => {
        console.error('/api Error (api/PkmnClassicDaily): ', error);
      });
  }, []);

  function lowerOrHigher(stat: number, statName: keyof PokemonData): string {
    let returnValue: string = redCross;
    if (pokemonToGuess){
      if (stat < Number(pokemonToGuess[statName])) {
        returnValue = redArrowUp;
      } else if (stat > Number(pokemonToGuess[statName])) {
        returnValue = redArrowDown;
      } else {
        returnValue = valid;
      }
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

  function containsTalents(talent: talents, talentToGuess: talents): string {
    const talent1 = ''.concat(talent.talent_1, (talent.talent_2 ? '' + talent.talent_2 : ''), (talent.talent_3 ? '' + talent.talent_3 : ''));
    const talent2 = ''.concat(talentToGuess.talent_1, (talentToGuess.talent_2 ? '' + talentToGuess.talent_2 : ''), (talentToGuess.talent_3 ? '' + talentToGuess.talent_3 : ''));
    if (talent1 === talent2){
      return valid
    }
    if (talent1.includes(talent2)) {
      return medium;
    } else {
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
            <img src={`http://pokeguess.fr/assets/spritesPixel/${zeroFill(Number(pokemon.pokedexId))}.jpg`} alt=''/>
          </li>
          <li>
            <img src={`http://pokeguess.fr/assets/types/${pokemon.type_1_name}.svg`} alt={pokemon.type_1_name} />
            <img src={ pokemonToGuess && typeValid(pokemon.type_1_name, pokemonToGuess.type_1_name)} alt="marker" />
          </li>
          <li>
            {pokemon.type_2_name && <img src={`http://pokeguess.fr/assets/types/${pokemon.type_2_name}.svg`} alt={pokemon.type_2_name} />} 
            {<img src={ pokemonToGuess && typeValid(pokemon.type_2_name, pokemonToGuess.type_2_name)} alt="marker" />}            
          </li>
          <li>
            {pokemon.talent_1_name ? pokemon.talent_1_name : 'No Talents'} 
            {pokemon.talent_3_name && ' / ' + pokemon.talent_2_name } 
            {pokemon.talent_3_name && ' / ' + pokemon.talent_2_name } 
            <img
              src={
                pokemonToGuess &&
                containsTalents(
                  {
                    talent_1: pokemon.talent_1_name,
                    talent_2: pokemon.talent_2_name,
                    talent_3: pokemon.talent_3_name,
                  },
                  {
                    talent_1: pokemonToGuess.talent_1_name,
                    talent_2: pokemonToGuess.talent_2_name,
                    talent_3: pokemonToGuess.talent_3_name,
                  }
                )
                         
              }
              alt="marker"
            />      
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
            {pokemon.generation}
            <img src={ lowerOrHigher(pokemon.generation, 'generation')} alt="marker" />
          </li>
        </div>
        )).reverse()}
      </ul>
    </section>
  )
}