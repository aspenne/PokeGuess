import { useEffect, useState } from "react";
import search from '../assets/images/icons/vector.svg';

interface PokemonData {
  name_fr: string;
  name_en: string;
  pokedexId: number;
}

function zeroFill(number:number) {
  return String(number).padStart(4, '0');
}

interface ClassicBarProps {
  onData: (data: number) => void;
  pokedexId: number[] | undefined;
  pokemonFound: boolean;
}

export default function Autocomplete({onData, pokedexId, pokemonFound}: ClassicBarProps) {
  const [value, setValue] = useState("");
  const [pokemonsIdName, setPokemonsIdName] = useState<PokemonData[]>([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState<{id:number, name:string}[]>([]);

  const handleButtonClick = (pkmnId:number) => {
    const newData = pkmnId;
    onData(newData); 
  };

  useEffect(() => {
    fetch('http://pokeguess.fr:3000/api/PkmnsIdName')
      .then(response => response.json())
      .then(data => {
        setPokemonsIdName(data);
      })
      .catch(error => {
        console.error('/api Error (api/PkmnsIdName): ', error);
      });
  }, []);

  useEffect(() => {
    if (pokedexId) {
      const excludedPokedexIds = pokedexId.map(id => id);
      setPokemonsIdName(pokemons => pokemons.filter((pokemon: PokemonData) => !excludedPokedexIds.includes(pokemon.pokedexId)));
    }
  }, [pokedexId]);

  useEffect(() => {
    setFilteredSuggestions(pokemonsIdName.map((pokemon) => ({
      id: pokemon.pokedexId,
      name: `${pokemon.name_fr} / ${pokemon.name_en}`
    })).filter(pokemon =>
      pokemon.name.toLowerCase().includes(value.toLowerCase())
    ));
  }, [value, pokemonsIdName]);

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
              if (filteredSuggestions.length > 0){
                handleButtonClick(filteredSuggestions[0].id);
                setPokemonsIdName(pokemons => pokemons.filter(pokemon => pokemon.pokedexId !== filteredSuggestions[0].id));
                setValue('');
              }
            }
          }}
          placeholder="Pikachu"
          disabled={pokemonFound}
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
                <img src={`http://pokeguess.fr/assets/spritesPixel/${zeroFill(suggestion.id)}.jpg`} alt={suggestion.id.toString()} />
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
