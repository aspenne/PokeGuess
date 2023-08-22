import { useState, useEffect } from "react";
import search from '../assets/images/icons/vector.svg';

function zeroFill(number:number) {
  return String(number).padStart(4, '0');
}

interface ClassicBarProps {
  onData: (data: number) => void;
}

export default function Autocomplete({onData}: ClassicBarProps) {
  const [value, setValue] = useState("");
  const [pokemonsIdName, setPokemonsIdName] = useState<{ name_fr: string, name_en: string, pokedexId: number }[]>([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState<{id:number, name:string}[]>([]);

  const handleButtonClick = (pkmnId:number) => {
    const newData = pkmnId;
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

  useEffect(() => {
    setFilteredSuggestions(pokemonsIdName.map((pokemon) => ({
      id: pokemon.pokedexId,
      name: `${pokemon.name_fr} / ${pokemon.name_en}`
    })).filter(pokemon =>
      pokemon.name.toLowerCase().includes(value.toLowerCase())
    ));

  }, [pokemonsIdName, value]);

  return (
    <div className="inputSuggestion">
      <div className="search-btn">
        <img src={search} alt="search icon" />
        <input
          type="text"
          value={value}
          onChange={(e) => {setValue(e.target.value);}}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleButtonClick(filteredSuggestions[0].id);
              setPokemonsIdName(pokemons => pokemons.filter(pokemon => pokemon.pokedexId !== filteredSuggestions[0].id));
              setValue('');
            }
          }}
          placeholder="Pikachu"
        />
      </div>
      { (value.length > 0 && filteredSuggestions.length > 0) && (
        <ul className="suggestions">
          {filteredSuggestions.map((suggestion, index) => (
            <div key={index} className={'pokemonBox'}>
              <li onClick={() => {
                setValue('');
                handleButtonClick(suggestion.id);
                setPokemonsIdName(pokemons => pokemons.filter(pokemon => pokemon.pokedexId !== suggestion.id));
              }}>
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
