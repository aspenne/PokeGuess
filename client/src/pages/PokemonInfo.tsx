import { useEffect, useState } from 'react' 
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar';
import PokemonInfoStats from '../components/PokemonInfoStats'

function zeroFill(number:number) {
  return String(number).padStart(4, '0');
}

export default function PokemonInfo() {

  const [pokemonName, setPokemonName] = useState('');

  const params = useParams()

  useEffect(() => {
    fetch(`/api/PkmnName/${params.id}`)
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
            <h1> {pokemonName.name_fr} n°{ zeroFill(Number(params.id)) }</h1>
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
              <div>
                <img src={`/src/assets/images/sprites/${zeroFill(Number(params.id))}.jpg`}/>
              </div>     
              <PokemonInfoStats/>        
            </section>
          </section>
        </section>
      </div>
    </div>

  )
}
