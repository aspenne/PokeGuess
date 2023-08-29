import { useState, useEffect } from "react";
import math from "../functions/math";

interface PokemonData {
  name_fr: string;
  name_en: string;
  pokedexId: number;
  positionId: number;
}

interface Props {
  id: number;
  onData: (data: PokemonData[]) => void;
}

export default function GuessBarShadow({ id, onData }: Props) {
  const [pokemons, setPokemons] = useState<PokemonData[]>(() => {
    const saved = localStorage.getItem("pokemonsStorageShadow");
    const initialValue = saved ? JSON.parse(saved) : [];
    const uniquePokemons = initialValue.filter((item:PokemonData, index:number, self:PokemonData[]) =>
      self.findIndex(p => p.pokedexId === item.pokedexId) === index
    );
    return uniquePokemons;
  });

  useEffect(() => {
    const sortedAndReversedPokemons = [...pokemons].sort((a, b) => a.positionId - b.positionId);
    localStorage.setItem("pokemonsStorageShadow", JSON.stringify(sortedAndReversedPokemons));
    onData(sortedAndReversedPokemons);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemons]);

  useEffect(() => {
    fetch(`/api/PkmnShadow/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPokemons((prevPokemons) => {
          const newData = data.map((newPokemon: PokemonData, index: number) => ({
            ...newPokemon,
            positionId: pokemons.length + index + 1,
          }));
          return [...prevPokemons, ...newData];
        });
      })
      .catch((error) => {
        console.error("/api Error (api/PkmnShadow): ", error);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);  

  return (
    <section className="guess-bar-shadow">
      <ul className="info-bar">
        <li>Pokemon</li>
        <li>Name</li>
      </ul>
      <ul className="pokemons">
        {pokemons
          .map((pokemon, index) => (
            <div key={index} className={"pokemonBox"}>
              <li>
                <img
                  src={`/src/assets/images/spritesPixel/${math.zeroFill(
                    Number(pokemon.pokedexId)
                  )}.jpg`}
                  alt=""
                />
              </li>
              <li>
                {pokemon.name_fr} / {pokemon.name_en}
              </li>
            </div>
          ))
          .reverse()}
      </ul>
    </section>
  );
}
