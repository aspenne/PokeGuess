import { useState, useEffect } from "react";

interface BulderData {
  name: string;
  id: number;
  positionId: number;
}

interface Props {
  id: number;
  onData: (data: BulderData[]) => void;
}

export default function GuessBarBuldi({ id, onData }: Props) {
  const [bulders, setBulders] = useState<BulderData[]>(() => {
    const saved = localStorage.getItem("BuldersStorage");
    const initialValue = saved ? JSON.parse(saved) : [];
    const uniquePokemons = initialValue.filter((item:BulderData, index:number, self:BulderData[]) =>
      self.findIndex(p => p.id === item.id) === index
    );
    return uniquePokemons;
  });

  useEffect(() => {
    const sortedAndReversedBulders = [...bulders].sort((a, b) => a.positionId - b.positionId);
    localStorage.setItem("BuldersStorage", JSON.stringify(sortedAndReversedBulders));
    onData(sortedAndReversedBulders);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bulders]);

  useEffect(() => {
    if (id === 1) { // Add the object only if id is 1
      setBulders((prevBulders) => [
        ...prevBulders,
        {
          name: 'Floriane Alizard',
          id: 1,
          positionId: 1,
        },
      ]);
    }
  }, [id]);  

  return (
    <section className="guess-bar-shadow">
      <ul className="info-bar">
        <li>Bulder</li>
        <li>Nom</li>
      </ul>
      <ul className="pokemons">
        {bulders
          .map((bulder, index) => (
            <div key={index} className={"pokemonBox"}>
              <li>
                <img
                  src={`https://pokeguess.fun/assets/images/buldi/FloPixel.png`}
                  alt="bulder"
                />
              </li>
              <li>
                {bulder.name}
              </li>
            </div>
          ))
          .reverse()}
      </ul>
    </section>
  );
}
