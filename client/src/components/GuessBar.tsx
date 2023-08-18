import React, { useState, useEffect } from 'react'

function zeroFill(number:number) {
  return String(number).padStart(4, '0');
}

export default function GuessBar({ id }: { id: number }) {
  const [pokemon, setPokemon] = useState([]);
  const [pokemons, setPokemons] = useState<any[]>([]);

  useEffect(() => {
    fetch(`/api/PkmnsClassic/${id}`)
      .then(response => response.json())
      .then(data => {
        setPokemon(data);
        setPokemons(prevPokemons => [...prevPokemons, ...data]);
      })
      .catch(error => {
        console.error('/api Error (api/PkmnClassic): ', error);
      });
  }, [id]);

  console.log(pokemons)

  return (
    <section>
      <ul>
        <li>Pokemon</li>
        <li>Type 1</li>
        <li>Type 2</li>
        <li>Talent</li>
        <li>Hp</li>
        <li>Atk</li>
        <li>Def</li>
        <li>Atk Spe</li>
        <li>Def Spe</li>
        <li>Speed</li>
        <li>Stade</li>
        <li>Gen</li>
      </ul>
      <ul>
      {pokemons.map((pokemon, index) => (
        <div key={index} className={'pokemonBox'}>
          <li>
            <img src={`/src/assets/images/spritesPixel/${zeroFill(Number(pokemon.pokedexId))}.jpg`} alt=''/>
          </li>
          <li>
            <img src={`/src/assets/images/types/${pokemon.type_1_name}.svg`} alt={pokemon.type_1_name} />
          </li>
          <li>
            {pokemon.type_2_name && <img src={`/src/assets/images/types/${pokemon.type_2_name}.svg`} alt={pokemon.type_2_name} />}  
          </li>
          <li>
            <p>
            {pokemon.talent_1_name ? pokemon.talent_3_name : 'No talent'}
            {pokemon.talent_2_name ? pokemon.talent_3_name : 'No talent'}
            {pokemon.talent_2_name ? pokemon.talent_3_name : 'No talent'}
            </p>
          </li>
          <li>
            {pokemon.hp}
          </li>
          <li>
            {pokemon.atk}
          </li>
          <li>
            {pokemon.def}
          </li>
          <li>
            {pokemon.spe_atk}
          </li>
          <li>
            {pokemon.spe_def}
          </li>
          <li>
            {pokemon.vit}
          </li>
          <li>
            {pokemon.stade}
          </li>
          <li>
            {pokemon.gen}
          </li>
        </div>
        ))}
      </ul>
    </section>
  )
}
