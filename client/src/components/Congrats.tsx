import React, { useState, useEffect } from 'react';
import math from '../functions/math';
import Countdown from 'react-countdown';
import { Link } from 'react-router-dom';
import angel from '../assets/images/navbar/angel.svg';
import ghost from '../assets/images/navbar/ghost.svg';
import hells from '../assets/images/navbar/hells-horns.svg';
import angelHover from '../assets/images/navbar/angelHover.svg';
import ghostHover from '../assets/images/navbar/ghostHover.svg';
import hellsHover from '../assets/images/navbar/hells-hornsHover.svg';


interface CongratsProps {
  pokemonId: number;
  attempt: number | undefined;
  active: boolean;
  isShiny: boolean;
  page: string;
}

interface buttonProps{
  id: string;
  imageActive: string;
  passiveImage: string;
  hoverImage: string;
  text: string;
  active: boolean;
}

const Congrats: React.FC<CongratsProps> = ({ pokemonId, attempt, active, isShiny, page }) => {
  const [secondsUntilMidnight, setSecondsUntilMidnight] = useState(0);
  const [button, setbutton] = useState<buttonProps[]>([
    { id: 'classic', imageActive: angel, passiveImage: angel, hoverImage: angelHover, text: 'Classic guess', active: false},
    { id: 'hard',imageActive: hells, passiveImage: hells, hoverImage: hellsHover, text: 'Hard guess', active: false},
    { id: 'shadow', imageActive: ghost, passiveImage: ghost, hoverImage: ghostHover, text: 'Shadow guess', active: false},
  ])

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
    const now = new Date(); 
    const midnightToday = new Date(now);
    midnightToday.setHours(24, 0, 0, 0);

    const timeDifference = midnightToday.getTime() - now.getTime();
    const seconds = Math.floor(timeDifference / 1000);

    setSecondsUntilMidnight(seconds);
  }, []);

  useEffect(() => {
    const updatedButtonItems = button
    .filter((item) => item.id !== page)
      .map((item) =>
        item.id === page ? { ...item, imageActive: item.hoverImage, active: true } : item
      );
    setbutton(updatedButtonItems);
  }, [page]);

  const handleMouseOver = (itemId: string) => {
    const updatedButtonItems = button.map((item) =>
      item.id === itemId ? { ...item, imageActive: item.hoverImage} : item
    );
    setbutton(updatedButtonItems);
  };

  const handleMouseOut = (itemId: string) => {
    const updatedButtonItems = button.map((item) =>
      item.id === itemId ? { ...item, imageActive: item.passiveImage} : item
    );
    setbutton(updatedButtonItems);
  };

  return (
    active && (
      <div className='congrats'>
        <h3>Félicitations</h3>
        <p>Tu as trouvé le pokémon en {attempt} essais !</p>
        {isShiny === true ?
        <img src={`/src/assets/images/spritesShiny/${math.zeroFill(pokemonId)}_shiny.jpg`} alt={pokemonId + 'image'} />:
        <img src={`/src/assets/images/sprites/${math.zeroFill(pokemonId)}.jpg`} alt={pokemonId + 'image'} />
        }
       <div>
          <p>Prochain Pokémon dans : </p>
          <Countdown 
            date={Date.now() + secondsUntilMidnight * 1000} 
            zeroPadTime={2}
            daysInHours={true}/>
        </div>
        <div className={'btns'}>
          {button.map((item) =>
            <Link key={item.id} to={`/${item.id}`}>
              <div
                id={item.id}
                onMouseOver={() => handleMouseOver(item.id)}
                onMouseOut={() => handleMouseOut(item.id)}
                className={'btn'}
                >
                <img src={item.imageActive} alt={item.text} />
                <p>{item.text}</p>
              </div>
            </Link>
          )}
        </div>
      </div>
    )
  );
}

export default Congrats;
