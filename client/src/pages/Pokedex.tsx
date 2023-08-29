import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PokemonCard from '../components/PokemonCard'
import Autocomplete from '../components/AutocompletePokedex'

interface Pokemon {
  pokedexId: string;
  generation: number;
  category: string;
  name_fr: string;
  name_en: string;
  type_1_name: string;
  type_2_name: string | null;
  talent_1_name: string | null;
  talent_2_name: string | null;
  talent_3_name: string | null;
  hp: number;
  atk: number;
  def: number;
  spe_atk: number;
  spe_def: number;
  vit: number;
  height: string;
  weight: string;
  stade: number;
}

export default function Pokedex() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

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
  
  return (
    <div>
      <Navbar 
        activeItem="pokedex" 
      />
      <div className='pokedex-body'>
        <div className='pokedex-content'>
          <h1> Bienvenue dans votre Pokédex</h1>
          <div className='pokedex-btn'>
            <button className='pokedex-btn-active'> Pokédex international </button>
            <button className='pokedex-btn-passive'> Mon Pokédex </button>
          </div>
          <div>
              <Autocomplete/>
          </div>
          <ul className={'pokemon-list'}>
            {pokemons.map((pokemon, index) => (
                <li key={index}>
                  <PokemonCard
                    type={pokemon.type_1_name}
                    type2={pokemon.type_2_name}
                    name={pokemon.name_fr}
                    pokedexID={parseInt(pokemon.pokedexId)}
                  />
                </li>
            ))} 
          </ul>
        </div>          
      </div>
      <Footer></Footer>
    </div>
  )
}