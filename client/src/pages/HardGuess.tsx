import { useState, useEffect, useCallback } from 'react';
import AutoCompleteGuess from '../components/AutocompleteGuess'
import Navbar from '../components/Navbar'
import GuessBar from '../components/GuessBarHard';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom'
import angel from '../assets/images/navbar/angel.svg'
import angelHover from '../assets/images/navbar/angelHover.svg'
import Congrats from '../components/Congrats';
import ParticlesConfetti from '../components/confetti';

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
  const [pokemonToGues, setPokemonToGuess] = useState<PokemonData>()
  const [angelIcon, setAngelIcon] = useState(angel)
  const [showConfetti, setShowConfetti] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [pokemonFounded, setPokemonFounded] = useState<boolean>(false)

  const handleChildDataId = useCallback((data: number) => {
    setPokemonId(data);
  }, []);

  const handleChildDataPokemons = useCallback((data: PokemonData[]) => {
    setPokemons(data);
  }, []);

  useEffect(() => {
    fetch(`/api/PkmnShinyDaily`)
      .then(response => response.json())
      .then(data => {
        setPokemonToGuess(data[0]);
      })
      .catch(error => {
        console.error('/api Error (api/PkmnShinyDaily): ', error);
      });
  }, []);

  useEffect(() => {
    if (pokemonToGues && pokemons && pokemons.length > 0) {
      if (pokemons.reverse()[0].pokedexId === pokemonToGues.pokedexId || pokemons[0].pokedexId === pokemonToGues.pokedexId) {
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
      <Navbar 
        activeItem="hard" 
      />
      <Congrats
        pokemonId={Number(pokemonToGues?.pokedexId)}
        active={showCongrats}
        attempt={pokemons?.length}
        isShiny={true}
        page={'hard'}
      />
      <ParticlesConfetti
        active={showConfetti} 
      />
      <section className='classic-body' style={{ opacity: showCongrats ? '0.3' : '1' }}>
        <div className={'title'} style={{ display: showCongrats ? 'none' : 'flex' }}>
          <h1> Trouve le Pokémon</h1>
          <p>
            Réussirez vous à retrouver les 1009 Pokémons aux travers des 9 générations différentes 
            ou bien encore de deviner qui se cache sous cette forme
          </p>
        </div>
        <AutoCompleteGuess
          onData={handleChildDataId}
          pokedexId={pokemons?.map(pokemon => pokemon.pokedexId) || []} 
          pokemonFound={pokemonFounded}
        />
        <GuessBar
          id={pokemonId}
          onData={handleChildDataPokemons}
        />
        <Link to={`/Classic`}>
          <button
              onMouseEnter={() => setAngelIcon(angelHover)}
              onMouseLeave={() => setAngelIcon(angel)} >
            <img src={angelIcon} alt="hells horns" 
            />
            Classic Mode
          </button>
        </Link>
      </section>
      </div>
     <Footer/>
    </div>
  )
}
