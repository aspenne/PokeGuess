import { useEffect, useState } from 'react';
import AutoCompleteGuess from '../components/AutocompleteGuess'
import Navbar from '../components/Navbar'
import PokemonClassicBar from '../components/PokemonClassicBar';
import GuessBar from '../components/GuessBar';



export default function ClassicBar({onData}) {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonId, setPokemonId] = useState(0);
  const [pokemonsIdName, setPokemonsIdName] = useState<{ name_fr: string, name_en: string, pokedexId: number }[]>([]);
  const [childData, setChildData] = useState(0);


  const handleChildData = (data: number) => {
    setPokemonId(data);
  };

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
    <div>
      <Navbar 
        activeItem="classic" 
      />
      <section className='classic-body'>
        <h1> Trouve le Pokémon</h1>
        <p>
          Réussirez vous à retrouver les 1009 Pokémons aux travers des 9 générations différentes 
          ou bien encore de deviner qui se cache sous cette forme
        </p>
        <AutoCompleteGuess
          onData={handleChildData}
        />
        <GuessBar
          id={pokemonId}
        />
      </section>
    </div>
  )
}
