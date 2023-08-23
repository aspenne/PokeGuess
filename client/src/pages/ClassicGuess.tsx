import { useState } from 'react';
import AutoCompleteGuess from '../components/AutocompleteGuess'
import Navbar from '../components/Navbar'
import GuessBar from '../components/GuessBarClassic';
import Footer from '../components/Footer';

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
}

export default function ClassicBar() {
  const [pokemonId, setPokemonId] = useState(0);
  const [pokemons, setPokemons] = useState<PokemonData[]>();

  const handleChildDataId = (data: number) => {
    setPokemonId(data);
  };

  const handleChildDataPokemons = (data: PokemonData[]) => {
    setPokemons(data);
  };

  return (
    <div>
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
          onData={handleChildDataId}
          pokemonList={pokemons}
        />
        <GuessBar
          id={pokemonId}
          onData={handleChildDataPokemons}
        />
      </section>
      </div>
     <Footer/>
    </div>
  )
}
