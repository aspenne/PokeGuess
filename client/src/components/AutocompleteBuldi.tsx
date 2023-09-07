import { useState, useEffect } from "react";
import search from '../assets/images/icons/vector.svg';

interface Bulder {
  name: string;
  id: number;
}

interface ClassicBarProps {
  onData: (data: number) => void;
  bulderFound: boolean;
}

export default function Autocomplete({onData, bulderFound}: ClassicBarProps) {
  const [value, setValue] = useState("");
  const [Bulder, setBulder] = useState<Bulder[]>([
    { name: 'Florianne Alizard', id: 1 },
  ]);
  const [filteredSuggestions, setFilteredSuggestions] = useState<{id:number, name:string}[]>([]);

  const handleButtonClick = (bulderId:number) => {
    onData(bulderId); 
  };
  
  useEffect(() => {
    setFilteredSuggestions(Bulder.map((bulder) => ({
      id: bulder.id,
      name: `${bulder.name}`
    })).filter(bulder =>
      bulder.name.toLowerCase().includes(value.toLowerCase())
    ));
  }, [value, Bulder]);

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
                setValue('');
              }
            }
          }}
          placeholder="Pikachu"
          disabled={bulderFound}
        />
      </div>
      { (value.length > 0 && filteredSuggestions.length > 0) && (
        <ul className="suggestions">
          {filteredSuggestions.map((suggestion, index) => (
            <div key={index} className={'pokemonBox'}>
              <li onClick={() => {
                setValue('');
                handleButtonClick(suggestion.id);
                setBulder(bulder => bulder.filter(bulder => bulder.id !== suggestion.id));
              }}>
                <img src={`https://pokeguess.fun/assets/images/buldi/FloPixel.png`} alt={'bulder'} />
                <p> Florianne Alizard </p>
              </li>
              <div className="line"></div>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}
