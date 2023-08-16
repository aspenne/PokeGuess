import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Link, Outlet } from 'react-router-dom'
import Images from '../components/sprites'
import PokemonCard from '../components/PokemonCard'

export default function Pokedex() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    fetch('api/Pkmns')
    .then(response => response.json())
  .then(data => {
      setPokemons(data);
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des données:', error);
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
            <button></button>
            <button></button>
          </div>
          <ul>
            {pokemons.map((pokemon, index) => (
              <li key={index}>
                <PokemonCard
                  type={pokemon.type_1_name}
                  type2={pokemon.type_2_name}
                  name={pokemon.name_fr}
                  pokedexID={pokemon.pokedexId}>
                </PokemonCard>
              </li>
            ))}
          </ul>
        </div>          
        <Outlet/>
      </div>
    </div>
  )
}
