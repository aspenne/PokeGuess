import React, { useState } from 'react';
import logo from '../assets/images/navbar/logo.svg';
import angel from '../assets/images/navbar/angel.svg';
import ghost from '../assets/images/navbar/ghost.svg';
import pokedex from '../assets/images/navbar/pokedex.svg';
import account from '../assets/images/navbar/account.svg';
import angelHover from '../assets/images/navbar/angelHover.svg';
import ghostHover from '../assets/images/navbar/ghostHover.svg';
import pokedexHover from '../assets/images/navbar/pokedexHover.svg';
import accountHover from '../assets/images/navbar/accountHover.svg';

function Navbar() {
  const [classicImageSrc, setClassicImageSrc] = useState(angel);
  const [shadowImageSrc, setShadowImageSrc] = useState(ghost);
  const [pokedexImageSrc, setPokedexImageSrc] = useState(pokedex);
  const [accountImageSrc, setAccountImageSrc] = useState(account);

  const hoverClassic = () => {
    setClassicImageSrc(angelHover);
  };
  const outClassic = () => {
    setClassicImageSrc(angel);
  };

  const hoverShadow = () => {
    setShadowImageSrc(ghostHover);
  };
  const outShadow = () => {
    setShadowImageSrc(ghost);
  };

  const hoverPokedex = () => {
    setPokedexImageSrc(pokedexHover);
  };
  const outPokedex = () => {
    setPokedexImageSrc(pokedex);
  };

  const hoverAccount = () => {
    setAccountImageSrc(accountHover);
  };
  const outAccount = () => {
    setAccountImageSrc(account);
  };

  return (
    <div className="navbar">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="left-part">
        <div id='classic' onMouseOver={hoverClassic} onMouseOut={outClassic}>
          <img src={classicImageSrc} alt="classic guess" />
          <p> Classic guess </p>
        </div>
        <div id='shadow' onMouseOver={hoverShadow} onMouseOut={outShadow}>
          <img src={shadowImageSrc} alt="shadow guess" />
          <p> Shadow Guess</p>
        </div>
        <div id='pokedex' onMouseOver={hoverPokedex} onMouseOut={outPokedex}>
          <img src={pokedexImageSrc} alt="pokedex" />
          <p> Pokédex </p>
        </div>
        <div id='account' onMouseOver={hoverAccount} onMouseOut={outAccount}>
          <img src={accountImageSrc} alt="account" />
          <p> Connecté </p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
