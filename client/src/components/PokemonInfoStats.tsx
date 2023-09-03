import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

type NavItemProps = {
  id: number
  text: string;
  active: boolean;
};

interface Pokemon {
  pokedexId: string;
  generation: number;
  category: string;
  name_fr: string;
  name_en: string;
  type_1_name: string;
  type_2_name: string | null;
  talent_1_name: string | null;
  talent_2_name: string | null;
  talent_3_name: string | null;
  hp: number;
  atk: number;
  def: number;
  spe_atk: number;
  spe_def: number;
  vit: number;
  height: string;
  weight: string;
  stade: number;
}

interface Evolution {
  pre_pokedexId: number | null;
  next_pokedexId: number | null;
  condition_evolution: string | null; // Remplacez "string" par le type approprié si connu
}

type EvolutionList = Evolution[];


const typeColor = {
  Combat: '#e74347',
  Roche: '#c5b489',
  Spectre: '#7773d4',
  Vol: '#a6c2f2',
  Fee: '#f3a7e7',
  Electrik: '#edd53e',
  Dragon: '#0c69c8',
  Plante: '#52f618',
  Feu: '#e87912',
  Eau: '#15c4dc',
  Sol: '#d29463',
  Insecte: '#82ca28',
  Ténèbres: '#2b2b36',
  Poison: '#a864c7',
  Psy: '#fe9f92',
  Acier: '#58a6aa',
  Glace: '#8cddd4',
  Normal: '#6b6b6b',
}

function zeroFill(number:number) {
  return String(number).padStart(4, '0');
}

export default function PokemonInfoStats() {

  const [pokemon, setPokemon] = useState<Pokemon>()
  const [evolution, setEvolution] = useState<EvolutionList>([])
  const [activeContent, setActiveContent] = useState<string>('');
  const [navItems, setNavItems] = useState<NavItemProps[]>([
    { id: 0, text: 'Stats', active: true},
    { id: 1, text: 'Talents', active: false},
    { id: 2, text: 'Evolutions', active: false},
  ]);

  const params = useParams()
  
  useEffect(() => {
    setActiveContent('Stats')
  }, []); 

  useEffect(() => {
    if (params.id !== undefined) {
      fetch(`https://pokeguess.up.railway.app/api/Pkmn/${params.id}`)
        .then(response => response.json())
        .then(data => {
          setPokemon(data[0]);
        })
        .catch(error => {
          console.error('/api Error (api/Pkmn/:id): ', error);
        });
    }
  }, [params.id]); 

  useEffect(() => {
    if (pokemon !== undefined) {
      fetch(`https://pokeguess.up.railway.app/api/Evolution/${pokemon.pokedexId}`)
        .then(response => response.json())
        .then(data => {
          setEvolution(data);
        })
        .catch(error => {
          console.error('/api Error (api/Evolution): ', error);
        });
    }
  }, [pokemon]);  

  const stats = [
    { name: 'Hp', value: pokemon?.hp, max: false},
    { name: 'Atk', value: pokemon?.atk, max: false},
    { name: 'Def', value: pokemon?.def, max: false},
    { name: 'SpeAtk', value: pokemon?.spe_atk, max: false},
    { name: 'SpeDef', value: pokemon?.spe_def, max: false},
    { name: 'Vit', value: pokemon?.vit, max: false},
  ];

  const maxValues = stats
  .map(stat => stat.value)
  .filter(value => value !== undefined)
  .sort((a, b) => (b || 0) - (a || 0))
  .slice(0, 2);

  stats.forEach(stat => {
    if (maxValues.includes(stat.value)) {
      stat.max = true;
    }
  });
  

  const handleMouseOnClick = (clickedIndex: number) => {
    const updatedNavItems = navItems.map((item, index) => ({
      ...item,
      active: index === clickedIndex,
    }));
    setNavItems(updatedNavItems);
    if (clickedIndex === 0) {
      setActiveContent('Stats');
    } else if (clickedIndex === 1) {
      setActiveContent('Talents');
    } else if (clickedIndex === 2) {
      setActiveContent('Evolutions');
    }
  };

  return (
    <article className='PokemonInfoStat'>
      <ul>
        {navItems.map((item) => (
          <li
            key={item.id}
            id={String(item.id)}
            style={{
              color: item.active && pokemon ? typeColor[pokemon?.type_1_name as keyof typeof typeColor] : '#ffffff',
            }}
            className={item.active ? 'active' : ''}
            onClick={() => handleMouseOnClick(item.id)}
          >
            <p>{item.text}</p>
          </li>
        ))}
      </ul>
      <div className='content'>
        {activeContent === 'Stats' && 
          <article className='stat'>
            {stats.map((item) => (
              <div className='line' key={item.name}>
                <div className={'nameValue'}>
                  <p> {item.name} </p>
                  <p> {item.value} </p>
                </div>
                <div className={'barComplete'}>
                <div
                  className={'barValue'}
                  style={{
                    width: `${(item.value ?? 0) / 2.75}%`,
                    backgroundColor: item.max ? typeColor[pokemon?.type_1_name as keyof typeof typeColor] : undefined,
                  }}
                />
                </div>
              </div>
            ))}
          </article>
        }
        {activeContent === 'Talents' && 
          <div></div>
        }
        {activeContent === 'Evolutions' &&
         <article className='evolution'>
          {evolution.map((item) => (
            (item.pre_pokedexId !== null || item.next_pokedexId !== null) && (
              <div key={item.pre_pokedexId ?? item.next_pokedexId}>
                <p
                  className='bold'
                  style={{ color: typeColor[pokemon?.type_1_name as keyof typeof typeColor] ?? typeColor.Normal }}
                >
                  {item.condition_evolution ?? 'Précédente'}
                </p>
                <div>
                  <Link key={item.pre_pokedexId ?? item.next_pokedexId} to={`/pokedex/${item.pre_pokedexId ?? item.next_pokedexId}`}>
                    <img src={`https://pokeguess.fun/assets/images/spritesPixel/${zeroFill(Number(item.pre_pokedexId ?? item.next_pokedexId))}.jpg`} alt='' />
                  </Link>
                  <p></p>
                </div>
              </div>
            )
          ))}
         </article>
        }
      </div>
    </article>
  );
}
