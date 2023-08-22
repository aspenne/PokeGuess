import { useEffect, useState } from 'react';
import Autocomplete from '../components/AutocompleteGuess'


export default function PokemonClassicBar() {
  const[childData, setChildData] = useState();
  const [pokemons, setPokemons] = useState([]);
  const [pokemonsIdName, setPokemonsIdName] = useState<{ name_fr: string, name_en: string, pokedexId: number }[]>([]);

  useEffect(() => {
    fetch('api/Pkmns')
    .then(response => response.json())
  .then(data => {
      setPokemons(data);
    })
    .catch(error => {
        console.error('API Error (api/Pkmns): ', error);
    });
  }, []);

  useEffect(() => {
    setChildData(childData);
  })

  useEffect(() => {
    fetch('api/PkmnsIdName')
    .then(response => response.json())
  .then(data => {
      setPokemonsIdName(data);
    })
    .catch(error => {
        console.error('API Error (api/PkmnsIdName): ', error);
    });
  }, []);

  return (
    <div>PokemonClassicBar
      <h1> Trouve le Pokémon</h1>
      <p>
        Réussirez vous à retrouvez les 1009 Pokémons aux travers des 9 générations différentes 
        ou bien encore de deviner qui se se cache sous cette forme
      </p>
      <Autocomplete
        onData={childData}
      />
    </div>
  )
}
