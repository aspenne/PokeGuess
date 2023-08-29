import { memo, useState, useEffect } from "react";
import AutoCompleteGuess from "../components/AutocompleteGuess";
import Navbar from "../components/Navbar";
import GuessBar from "../components/GuessBarShadow";
import Footer from "../components/Footer";
import math from "../functions/math";
import ParticlesConfetti from "../components/confetti";
import Congrats from "../components/Congrats";
const MemoizedGuessBarShadow = memo(GuessBar);

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
  const [pokemons, setPokemons] = useState<PokemonData[]>();
  const [pokemonToGues, setPokemonToGuess] = useState<ShadowType>()
  const [brightness, setBrightness] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [pokemonFounded, setPokemonFounded] = useState<boolean>(false)

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
    if (pokemonToGues && pokemons && pokemons.length > 0) {
      if (pokemons.reverse()[0].pokedexId === Number(pokemonToGues.id) || pokemons[0].pokedexId === Number(pokemonToGues.id)) {
        ParticlesConfetti; 
        setPokemonFounded(true);
        setBrightness(100)
        setShowConfetti(true);
        setShowCongrats(true);
      }
    }
  }, [pokemons, pokemonToGues]);


  return (
    <div>
      <div>
        <Navbar activeItem="shadow" />
          <Congrats
            pokemonId={Number(pokemonToGues?.id)}
            active={showCongrats}
            attempt={pokemons?.length}
            isShiny={false}
            page={'shadow'}
          />
          <ParticlesConfetti 
            active={showConfetti} 
          />
        <section className="classic-body" style={{ opacity: showCongrats ? '0.3' : '1' }}>
            <div className="text" style={{ display: showCongrats ? 'none' : 'flex' }}>
              <h1> Trouve le Pokémon</h1>
              <p>
                Réussirez vous à retrouver les 1009 Pokémons aux travers des 9
                générations différentes ou bien encore de deviner qui se cache sous
                cette forme
              </p>
            </div>
          
          <img 
            style={{filter: `brightness(${brightness}%)`}}
            src={`/src/assets/images/sprites/${pokemonToGues?.id ? math.zeroFill(parseInt(pokemonToGues.id)) + '.jpg' : ''}`} 
            alt={pokemonToGues?.id?.toString()} 
          />
          <AutoCompleteGuess
            onData={handleChildDataId}
            pokedexId={pokemons?.map(pokemon => ({
              id: pokemon.pokedexId
            }))}
            pokemonFound={pokemonFounded}
          />
          <MemoizedGuessBarShadow id={pokemonId} onData={handleChildDataPokemons} />
        </section>
      </div>
      <Footer />
    </div>
  );
}
