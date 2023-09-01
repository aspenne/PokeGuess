import { useState, useEffect } from 'react';
import AutoCompleteGuess from '../components/AutocompleteGuess'
import Navbar from '../components/Navbar'
import GuessBar from '../components/GuessBarClassic';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom'
import HellsHorns from '../assets/images/navbar/hells-horns.svg'
import HellsHornsHover from '../assets/images/navbar/hells-hornsHover.svg'
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
  const [HellsIcon, setHellsIcon] = useState(HellsHorns);
  const [pokemonToGues, setPokemonToGuess] = useState<PokemonData>()
  const [showConfetti, setShowConfetti] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [pokemonFounded, setPokemonFounded] = useState<boolean>(false)

  

  const handleChildDataId = (data: number) => {
    setPokemonId(data);
  };

  const handleChildDataPokemons = (data: PokemonData[]) => {
    setPokemons(data);
  };

  useEffect(() => {
    fetch(`/api/PkmnClassicDaily`)
      .then(response => response.json())
      .then(data => {
        setPokemonToGuess(data[0]);
      })
      .catch(error => {
        console.error('/api Error (api/PkmnClassicDaily): ', error);
      });
  }, []);

  useEffect(() => {
    if (pokemonToGues && pokemons && pokemons.length > 1) {
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
        activeItem="classic" 
      />
      <Congrats
        pokemonId={Number(pokemonToGues?.pokedexId)}
        active={showCongrats}
        attempt={pokemons?.length}
        isShiny={false}
        page={'classic'}
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
        <Link to={`/Hard`}>
          <button
              onMouseEnter={() => setHellsIcon(HellsHornsHover)}
              onMouseLeave={() => setHellsIcon(HellsHorns)} >
            <img src={HellsIcon} alt="hells horns" 
            />
            Hard Mode
          </button>
        </Link>
      </section>
      </div>
     <Footer/>
    </div>
  )
}
