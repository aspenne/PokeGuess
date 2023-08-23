import { useState, useEffect } from 'react'

function zeroFill(number:number) {
  return String(number).padStart(4, '0');
}

interface PokemonData {
  name_fr: string;
  name_en: string;
  pokedexId: number;
}

interface Props {
  id: number;
  onData: (data: PokemonData[]) => void;
}

export default function GuessBarShadow({ id, onData }:Props) {
  const [pokemons, setPokemons] = useState<PokemonData[]>(() => {
    const saved = localStorage.getItem("pokemonsStorageShadow");
    const initialValue = saved ? JSON.parse(saved) : [];
    return initialValue || "";
  });

  useEffect(() => {
    localStorage.setItem('pokemonsStorageShadow', JSON.stringify(pokemons))
    onData(pokemons); 
  }, [])

  useEffect(() => {
    fetch(`/api/PkmnShadow/${id}`)
      .then(response => response.json())
      .then(data => {
        setPokemons(prevPokemons => [...prevPokemons, ...data]);
      })
      .catch(error => {
        console.error('/api Error (api/PkmnClassic): ', error);
      });
  }, [id]);

  function pokemonFound(idGuess: number, id: number): string{
    if ( id == idGuess){
      return 'true';
    }
    else{
      return 'false';
    }
  }
  
  return (
    <section 
      className='guess-bar-shadow'>
      <ul className='info-bar'>
        <li>Pokemon</li>
        <li>Name</li>
      </ul>
      <ul className='pokemons'>
      {pokemons.map((pokemon, index) => (
        <div key={index} className={'pokemonBox'}>
          <li>
            <img src={`/src/assets/images/spritesPixel/${zeroFill(Number(pokemon.pokedexId))}.jpg`} alt=''/>
          </li>
          <li>
            {pokemon.name_fr} / {pokemon.name_en}
          </li>
        </div>
        )).reverse()}
      </ul>
    </section>
  )
}
