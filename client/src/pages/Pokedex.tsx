import React from 'react'
import Navbar from '../components/Navbar'
import { Link, Outlet } from 'react-router-dom'

export default function Pokedex() {
  return (
    <div>
        <Navbar activeItem="pokedex" />
        <h1>Pokedex</h1>
        <Link to='/pokedex/3'> pokemon</Link>
        <Outlet/>
    </div>
    

  )
}
