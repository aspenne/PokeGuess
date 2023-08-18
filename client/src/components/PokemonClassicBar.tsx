import { useEffect, useState } from 'react';
import Autocomplete from './AutocompleteGuess'


export default function PokemonClassicBar() {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonsIdName, setPokemonsIdName] = useState<{ name_fr: string, name_en: string, pokedexId: number }[]>([]);

  useEffect(() => {
    fetch('/api/Pkmns')
    .then(response => response.json())
  .then(data => {
      setPokemons(data);
    })
    .catch(error => {
        console.error('/api Error (api/Pkmns): ', error);
    });
  }, []);

  useEffect(() => {
    fetch('/api/PkmnsIdName')
    .then(response => response.json())
  .then(data => {
      setPokemonsIdName(data);
    })
    .catch(error => {
        console.error('/api Error (api/PkmnsIdName): ', error);
    });
  }, []);

  return (
    <div>PokemonClassicBar
      <h1> Trouve le Pokémon</h1>
      <p>
        Réussirez vous à retrouvez les 1009 Pokémons aux travers des 9 générations différentes 
        ou bien encore de deviner qui se se cache sous cette forme
      </p>
      <Autocomplete/>
    </div>
  )
}
