import { useState, useEffect } from "react";
import search from '../assets/images/icons/vector.svg';
import { Link } from "react-router-dom";

function zeroFill(number:number) {
  return String(number).padStart(4, '0');
}

export default function Autocomplete() {
  const [value, setValue] = useState("");
  const [pokemonsIdName, setPokemonsIdName] = useState<{ name_fr: string, name_en: string, pokedexId: number }[]>([]);

  useEffect(() => {
    fetch('https://pokeguess.up.railway.app/api/PkmnsIdName')
    .then(response => response.json())
  .then(data => {
      setPokemonsIdName(data);
    })
    .catch(error => {
        console.error('/api Error (api/PkmnsIdName): ', error);
    });
  }, []);

  const suggestions = pokemonsIdName.map((pokemon) => ({
    id: pokemon.pokedexId,
    name: `${pokemon.name_fr} / ${pokemon.name_en}`
  })).filter(suggestion =>
    suggestion.name.toLowerCase().includes(value.toLowerCase())
  );

  return (
    <div className="inputSuggestion">
      <div className="search-btn">
        <img src={search} alt="search icon" />
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && suggestions.length > 0) {
              window.location.href = `/pokedex/${suggestions[0].id}`;
            }
          }}
          placeholder="Pikachu"
        />
      </div>
      {(value.length > 0 && suggestions.length > 0) && (
        <ul className="suggestions">
          {suggestions.map((suggestion, index) => (
          <div className={'pokemonBox'}>
            <Link key={index} to={`/pokedex/${suggestion.id}`}>
              <li key={index} className="pokedexAutocomplete">
                <img src={`https://pokeguess.fun/assets/images/spritesPixel/${zeroFill(suggestion.id)}.jpg`} alt={suggestion.id.toString()} />
                <p>{suggestion.name}</p>
              </li>
              <div className="line"></div>
            </Link>
          </div>
          ))}
        </ul>
      )}
    </div>
  );
}
