import reshiram from '../assets/images/home/reshiram.svg'
import reshiramShadow from '../assets/images/home/reshiramShadow.svg'
import reshiramGradient from '../assets/images/home/reshiramGradient.png'
import { Link } from 'react-router-dom'


function Body() {

    return (
        <div className='body-home'>
            <section className='container'>
                <article className='right-part'>
                    <h1> Bienvenue sur PokéGuess </h1>
                    <p> Chaque jour, un Pokémon sauvage se cache.C'est à toi, dresseur de Pokémon, de l'attraper (le deviner) !
                        Réussirez-vous à retrouver les 1009 Pokémons aux travers des 9 différentes générations ?</p>
                <div className='btn-home'>
                    <Link to={`/classic`}>
                    <button> Je trouve le Pokémon </button>
                    </Link>
                    <Link to={`/shadow`}>
                    <button> Je découvre l'ombre </button>
                    </Link>
                </div>
                </article>
                <article 
                className='left-part'>
                    <img id='reshiram' src={reshiram} alt="reshiram" />
                    <img id='reshiramShadow 'src={reshiramShadow} alt="reshiram shadow" />
                    <img id='reshiramGradient'src={reshiramGradient} alt="linear gradient" />
                </article>
            </section>
        </div>
    )}

export default Body