import { useState, useEffect } from "react";
import AutoCompleteGuess from "../components/AutocompleteGuess";
import Navbar from "../components/Navbar";
import GuessBar from "../components/GuessBarShadow";
import Footer from "../components/Footer";
import math from "../functions/math";
import ParticlesConfetti from "../components/confetti"; // Assurez-vous que le chemin est correct

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
  const [brightness, setBrightness] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false); 
  const [pokemonFounded, setPokemonFounded] = useState<boolean>(() => {
    const saved = localStorage.getItem("pokemonFound");
    const initialValue = saved ? JSON.parse(saved) : false;
    return initialValue;
  });
  const [pokemonsStorage] = useState<PokemonData[]>(() => {
    const saved = localStorage.getItem("pokemonsStorageShadow");
    const initialValue = saved ? JSON.parse(saved) : [];
    return initialValue || "";
  });

  function pokemonFound(idGuess: number, id: number | undefined): boolean {
    pokemonsStorage[0] && setPokemonId(pokemonsStorage.reverse()[0].pokedexId);
    if ( id === idGuess) {
      ParticlesConfetti;
      setBrightness(100);
      localStorage.setItem('pokemonFound', 'true')
      setPokemonFounded(true)
      return true;
    } else {
      return false;
    }
  }

  const handleChildDataId = (data: number) => {
    setPokemonId(data);
    brightness < 100 && setBrightness(brightness + 1);
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

  useEffect(() => {
    const isPokemonFound = pokemonFound(pokemonId, pokemonToGues?.id);
      if (isPokemonFound) {
        setShowConfetti(true);
      }
  }, [pokemonId, pokemonToGues])

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
            style={{filter: `brightness(${brightness}%)`}}
            src={`/src/assets/images/sprites/${pokemonToGues?.id ? math.zeroFill(parseInt(pokemonToGues.id)) + '.jpg' : ''}`} 
            alt={pokemonToGues?.id?.toString()} 
          />
          <ParticlesConfetti 
            active={showConfetti} 
          />
          <AutoCompleteGuess
            onData={handleChildDataId}
            pokemonList={pokemons}
            pokemonFound={pokemonFounded}
          />
          <GuessBar id={pokemonId} onData={handleChildDataPokemons} />
        </section>
      </div>
      <Footer />
      <script src="https://cdn.jsdelivr.net/npm/tsparticles-confetti@2.12.0/tsparticles.confetti.bundle.min.js"></script>
    </div>
  );
}
