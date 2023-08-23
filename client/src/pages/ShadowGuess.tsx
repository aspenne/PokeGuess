import { useState, useEffect } from "react";
import AutoCompleteGuess from "../components/AutocompleteGuess";
import Navbar from "../components/Navbar";
import GuessBar from "../components/GuessBarShadow";
import Footer from "../components/Footer";
import math from "../functions/math";

interface PokemonData {
  name_fr: string;
  name_en: string;
  pokedexId: number;
}

interface ShadowType {
  id: string;
  date: string;
}

export default function ShadowGuess() {
  const [pokemonId, setPokemonId] = useState(0);
  const [pokemonToGues, setPokemonToGuess] = useState<ShadowType>()
  const [pokemons, setPokemons] = useState<PokemonData[]>([]);

  const handleChildDataId = (data: number) => {
    setPokemonId(data);
  };

  const handleChildDataPokemons = (data: PokemonData[]) => {
    setPokemons(data);
  };

  useEffect(() => {
    fetch(`/api/PkmnShadowDaily`)
      .then(response => response.json())
      .then(data => {
        setPokemonToGuess(data[0]);
      })
      .catch(error => {
        console.error('/api Error (api/PkmnShadowDaily): ', error);
      });
  }, []);

  return (
    <div>
      <div>
        <Navbar activeItem="shadow" />
        <section className="classic-body">
          <h1> Trouve le Pokémon</h1>
          <p>
            Réussirez vous à retrouver les 1009 Pokémons aux travers des 9
            générations différentes ou bien encore de deviner qui se cache sous
            cette forme
          </p>
          <img 
            style={{filter: 'brightness(0%)'}}
            src={`/src/assets/images/sprites/${pokemonToGues?.id ? math.zeroFill(parseInt(pokemonToGues.id)) + '.jpg' : ''}`} 
            alt={pokemonToGues?.id?.toString()} 
          />
          <AutoCompleteGuess
            onData={handleChildDataId}
            pokemonList={pokemons}
          />
          <GuessBar id={pokemonId} onData={handleChildDataPokemons} />
        </section>
      </div>
      <Footer />
    </div>
  );
}
