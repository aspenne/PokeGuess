import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Pokedex from './pages/Pokedex';
import PokemonInfo from './pages/PokemonInfo';

function App(){
	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={ <Home/> }/>
				<Route path='/pokedex' element={ <Pokedex/> }>
					<Route path='/pokedex/:id' element={ <PokemonInfo/> }/>
				</Route>
			</Routes>
		</div>
	)
}

export default App