import { Link } from 'react-router-dom';
import math from '../functions/math';

interface PokemonCardProps {
  type: string;
  type2: string | null;
  name: string;
  pokedexID: number;
}

function PokemonCard({ type, type2, name, pokedexID }: PokemonCardProps){
  const primaryTypeClass = `type-${type}`;

  return (
    <section className='pokemonCard'>
      <article className='nameType'>
        <div className="types">
          <img src={`/src/assets/images/types/${type}.svg`} alt={type} />
          {type2 && <img src={`/src/assets/images/types/${type2}.svg`} alt={type2} />}
        </div>
        <h3>{name}</h3>
      </article>
      <img className='pokemon' src={`/src/assets/images/sprites/${math.zeroFill(pokedexID)}.jpg`} alt={`pokemon-${pokedexID}`}/>
      <Link to={`/pokedex/${pokedexID}`}>
        <button className={primaryTypeClass}> En savoir plus</button>
      </Link>
    </section>
  );
}

export default PokemonCard;
