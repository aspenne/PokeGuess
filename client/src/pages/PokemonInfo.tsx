import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import PokemonInfoStats from '../components/PokemonInfoStats';

interface PokemonName {
  name_fr: string;
}

function zeroFill(number:number) {
  return String(number).padStart(4, '0');
}

export default function PokemonInfo() {

  const [pokemonName, setPokemonName] = useState<PokemonName>();

  const params = useParams()

  useEffect(() => {
    fetch(`http://pokeguess.fr:3000/api/PkmnName/${params.id}`)
    .then(response => response.json())
  .then(data => {
      setPokemonName(data[0]);
    })
    .catch(error => {
        console.error('/api Error (api/PkmnName): ', error);
    });
  }, [params.id]); 

  return (
    <div>
      <Navbar activeItem='none'/>
      <div className='pokedexInfoBody'>
        <section>
          <div className="title">
            <h1> {pokemonName?.name_fr} n°{ zeroFill(Number(params.id)) }</h1>
          </div>
          <section className='pokemonInfoCard'>
            <div className='btn'>
              <Link to={`/pokedex/${(Number(params.id))-1}`}>
                <button> Précédent </button>
              </Link>
              <Link to={`/pokedex/${(Number(params.id))+1}`}>
                <button> Suivant </button>
              </Link>
            </div>
            <section className='pokemonImageStats'>
              <img src={`http://pokeguess.fr/assets/sprites/${zeroFill(Number(params.id))}.jpg`}/>
              <PokemonInfoStats/>        
            </section>
          </section>
        </section>
      </div>
      <Footer/>
    </div>

  )
}
