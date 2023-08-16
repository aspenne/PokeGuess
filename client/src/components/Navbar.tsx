import React, { useState, useEffect } from 'react';
import logo from '../assets/images/navbar/logo.svg';
import angel from '../assets/images/navbar/angel.svg';
import ghost from '../assets/images/navbar/ghost.svg';
import pokedex from '../assets/images/navbar/pokedex.svg';
import account from '../assets/images/navbar/account.svg';
import angelHover from '../assets/images/navbar/angelHover.svg';
import ghostHover from '../assets/images/navbar/ghostHover.svg';
import pokedexHover from '../assets/images/navbar/pokedexHover.svg';
import accountHover from '../assets/images/navbar/accountHover.svg';
import { Link } from 'react-router-dom';

type NavItemProps = {
  id: string;
  imageActive: string;
  passiveImage: string;
  hoverImage: string;
  text: string;
  active: boolean;
};

type NavbarProps = {
  activeItem: string;
};

const Navbar: React.FC<NavbarProps> = ({ activeItem }) => {
  const [navItems, setNavItems] = useState<NavItemProps[]>([
    { id: 'classic', imageActive: angel, passiveImage: angel, hoverImage: angelHover, text: 'Classic guess', active: false},
    { id: 'shadow', imageActive: ghost, passiveImage: ghost, hoverImage: ghostHover, text: 'Shadow Guess', active: false},
    { id: 'pokedex', imageActive: pokedex, passiveImage: pokedex, hoverImage: pokedexHover, text: 'Pokédex', active: false},
    { id: 'account', imageActive: account, passiveImage: account, hoverImage: accountHover, text: 'Connecté', active: false},
  ]);

  useEffect(() => {
    const updatedNavItems = navItems.map((item) =>
      item.id === activeItem ? { ...item, imageActive: item.hoverImage, active: true } : item
    );
    setNavItems(updatedNavItems);
  }, [activeItem]);

  const handleMouseOver = (itemId: string) => {
    if (activeItem !== itemId) {
      const updatedNavItems = navItems.map((item) =>
        item.id === itemId ? { ...item, imageActive: item.hoverImage} : item
      );
      setNavItems(updatedNavItems);
    }
  };

  const handleMouseOut = (itemId: string) => {
    if (activeItem !== itemId) {
      const updatedNavItems = navItems.map((item) =>
        item.id === itemId ? { ...item, imageActive: item.passiveImage } : item
      );
      setNavItems(updatedNavItems);
    }
  };


  return (
    <div className="navbar">
      <Link to={'/'}>
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
      </Link>
      <div className="left-part">
        {navItems.map((item) => (
          <Link key={item.id} to={`/${item.id}`}>
            <div
              id={item.id}
              onMouseOver={() => handleMouseOver(item.id)}
              onMouseOut={() => handleMouseOut(item.id)}
              className={item.active ? 'active' : ''}
            >
            <img src={item.imageActive} alt={item.text} />
            <p>{item.text}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Navbar;
