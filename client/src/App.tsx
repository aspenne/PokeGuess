import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react';
import Home from './pages/Home';
import Pokedex from './pages/Pokedex';
import PokemonInfo from './pages/PokemonInfo';
import Classic from './pages/ClassicGuess';
import Hard from './pages/HardGuess';
import ShadowGuess from './pages/ShadowGuess';
import { scheduleCacheCleanup } from './functions/cron.js';

function App(){

	useEffect(() => {
    scheduleCacheCleanup();
  }, []);

	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={ <Home/> }/>
				<Route path='/pokedex' element={ <Pokedex/> }/>
				<Route path='/pokedex/:id' element={ <PokemonInfo/> }/>
				<Route path='/classic' element={ <Classic/> }/>
				<Route path='/hard' element={ <Hard/> }/>
				<Route path='/hard' element={ <Hard/> }/>
				<Route path='/shadow' element={ <ShadowGuess/> }/>
			</Routes>
		</div>
	)
} 

export default App