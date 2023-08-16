import { useEffect, useState } from 'react' 
import { useParams } from 'react-router-dom'

export default function PokemonInfo() {

  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    fetch('api/allPkmn')
    .then(response => response.json())
  .then(data => {
      setPokemons(data);
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des données:', error);
    });
  }, []);

    const id = useParams()
    console.log(id)

  return (
    <div>
        <h1>{ id.id }</h1>
    <div>pokemonInfo</div>
    </div>

  )
}
