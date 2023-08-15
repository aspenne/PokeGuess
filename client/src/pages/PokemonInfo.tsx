import { useParams } from 'react-router-dom'

export default function PokemonInfo() {

    const id = useParams()
    console.log(id)

  return (
    <div>
        <h1>{ id.id }</h1>
    <div>pokemonInfo</div>
    </div>

  )
}
