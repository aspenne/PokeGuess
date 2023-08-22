import { useState } from 'react';
import AutoCompleteGuess from '../components/AutocompleteGuess'
import Navbar from '../components/Navbar'
import GuessBar from '../components/GuessBar';
import Footer from '../components/Footer';



export default function ClassicBar() {
  const [pokemonId, setPokemonId] = useState(0);


  const handleChildData = (data: number) => {
    setPokemonId(data);
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
          onData={handleChildData}
        />
        <GuessBar
          id={pokemonId}
        />
      </section>
      
      </div>
     <Footer/>
    </div>
  )
}
