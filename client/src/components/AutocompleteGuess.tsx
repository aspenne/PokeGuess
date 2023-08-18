import { useState, useEffect } from "react";
import search from '../assets/images/icons/vector.svg';

function zeroFill(number:number) {
  return String(number).padStart(4, '0');
}

export default function Autocomplete({onData}) {
  const [value, setValue] = useState("");
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [pokemonsIdName, setPokemonsIdName] = useState<{ name_fr: string, name_en: string, pokedexId: number }[]>([]);
  const [childData, setChildData] = useState(0)

  const handleButtonClick = (pkmnId:number) => {
    console.log(pkmnId)
    const newData = pkmnId;
    setChildData(newData);
    onData(newData); 
  };

  useEffect(() => {
    fetch('/api/PkmnsIdName')
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
          onFocus={() => setShowSuggestion(true)}
          // onBlur={() => setShowSuggestion(false)}
          placeholder="Pikachu"
        />
      </div>
      
      {showSuggestion && (
          <ul className="suggestions">
            {suggestions.map((suggestion, index) => (
            <div key={index} className={'pokemonBox'}>
              <li onClick={() => handleButtonClick(suggestion.id)}>
                <img src={`/src/assets/images/spritesPixel/${zeroFill(suggestion.id)}.jpg`} alt={suggestion.id.toString()} />
                <p>{suggestion.name}</p>
              </li>
              <div className="line"></div>
            </div>
            ))}
          </ul>
        )}
    </div>
  );
}
