import { memo, useEffect, useState } from "react";
import AutoCompleteGuess from "../components/AutocompleteGuess";
import ParticlesConfetti from "../components/confetti";
import Congrats from "../components/Congrats";
import Footer from "../components/Footer";
import GuessBar from "../components/GuessBarShadow";
import Navbar from "../components/Navbar";
import { scheduleCacheCleanup } from "../functions/cron";
import math from "../functions/math";
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

  useEffect(() => {
    scheduleCacheCleanup();
  }, []);

  const handleChildDataId = (data: number) => {
    setPokemonId(data);
    brightness < 100 && setBrightness(brightness + 1);
  };

  const handleChildDataPokemons = (data: PokemonData[]) => {
    setPokemons(data);
  };

  useEffect(() => {
    fetch(`http://pokeguess.fr:3000/api/PkmnShadowDaily`)
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
            attempt={pokemons?.length || 0}
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
            className={'imageToGuess'}
            style={{filter: `brightness(${brightness}%)`}}
            src={`http://pokeguess.fr/assets/sprites/${pokemonToGues?.id ? math.zeroFill(parseInt(pokemonToGues.id)) + '.jpg' : ''}`} 
            alt={pokemonToGues?.id?.toString()} 
          />
          <AutoCompleteGuess
            onData={handleChildDataId}
            pokedexId={pokemons?.map(pokemon => pokemon.pokedexId) || []}
            pokemonFound={pokemonFounded}
          />
          <MemoizedGuessBarShadow id={pokemonId} onData={handleChildDataPokemons} />
        </section>
      </div>
      <Footer />
    </div>
  );
}
