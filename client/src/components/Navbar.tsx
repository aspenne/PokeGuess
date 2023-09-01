import React, { useState, useEffect } from 'react';
import logo from '../assets/images/navbar/logo.svg';
import angel from '../assets/images/navbar/angel.svg';
import ghost from '../assets/images/navbar/ghost.svg';
import pokedex from '../assets/images/navbar/pokedex.svg';
import hells from '../assets/images/navbar/hells-horns.svg';
// import account from '../assets/images/navbar/account.svg';
import angelHover from '../assets/images/navbar/angelHover.svg';
import ghostHover from '../assets/images/navbar/ghostHover.svg';
import pokedexHover from '../assets/images/navbar/pokedexHover.svg';
import hellsHover from '../assets/images/navbar/hells-hornsHover.svg';
// import accountHover from '../assets/images/navbar/accountHover.svg';
import burger from '../assets/images/navbar/burgerMenu.svg';
import cross from '../assets/images/navbar/cross.svg';
import angelMobile from '../assets/images/navbar/angelMobile.svg';
import ghostMobile from '../assets/images/navbar/ghostMobile.svg';
import pokedexMobile from '../assets/images/navbar/pokedexMobile.svg';
import hellsMobile from '../assets/images/navbar/hellsMobile.svg';
// import accountMobile from '../assets/images/navbar/accountMobile.svg';

import { Link } from 'react-router-dom';

type NavItemProps = {
  id: string;
  imageActive: string;
  passiveImage: string;
  hoverImage: string;
  text: string;
  active: boolean;
};

type NavItemPropsMobile = {
  id: string;
  imageActive: string;
  text: string;
};

type NavbarProps = {
  activeItem: string;

};

const Navbar: React.FC<NavbarProps> = ({ activeItem }) => {
  const [navItems, setNavItems] = useState<NavItemProps[]>([
    { id: 'classic', imageActive: angel, passiveImage: angel, hoverImage: angelHover, text: 'Classic guess', active: false},
    { id: 'hard', imageActive: hells, passiveImage: hells, hoverImage: hellsHover, text: 'Hard guess', active: false},
    { id: 'shadow', imageActive: ghost, passiveImage: ghost, hoverImage: ghostHover, text: 'Shadow guess', active: false},
    { id: 'pokedex', imageActive: pokedex, passiveImage: pokedex, hoverImage: pokedexHover, text: 'Pokédex', active: false},
    // { id: 'account', imageActive: account, passiveImage: account, hoverImage: accountHover, text: 'Connecté', active: false},
  ]);
  const [burgerActive, setBurgerActive] = useState<boolean>(false)
  const [NavItemsMobile] = useState<NavItemPropsMobile[]>([
    { id: 'classic', imageActive: angelMobile, text: 'Classic guess'},
    { id: 'hard', imageActive: hellsMobile, text: 'Hard guess'},
    { id: 'shadow', imageActive: ghostMobile, text: 'Shadow guess'},
    { id: 'pokedex', imageActive: pokedexMobile, text: 'Pokédex'},
  ]);

  let iconMobile:string = burger;

  useEffect(() => {
    const updatedNavItems = navItems.map((item) =>
      item.id === activeItem ? { ...item, imageActive: item.hoverImage, active: true } : item
    );
    setNavItems(updatedNavItems);
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      { window.innerWidth > 950 && 
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
      }
      { window.innerWidth < 950 && 
      <div className="left-part">
        <img  src={iconMobile} alt={'burger menu icon'} 
          onClick={() => {
            setBurgerActive(burgerActive == true ? false : true)
            iconMobile == burger ? iconMobile = cross : iconMobile = burger
          }}
        />
      </div>
      }
      { burgerActive == true &&
        <div className="mobile-burger">
        {NavItemsMobile.map((item) => (
            <Link key={item.id} to={`/${item.id}`}>
              <div
                id={item.id}
              >
                <div>
                  <img src={item.imageActive} alt={item.text} />
                  <p>{item.text}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      }
    </div>
  );
}

export default Navbar;
