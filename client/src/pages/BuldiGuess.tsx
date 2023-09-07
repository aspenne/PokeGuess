import { memo, useState, useEffect } from "react";
import AutoCompleteGuessBuldi from "../components/AutocompleteBuldi";
import Navbar from "../components/Navbar";
import GuessBar from "../components/GuessBarBuldi";
import Footer from "../components/Footer";
import ParticlesConfetti from "../components/confetti";
import CongratsBuldi from "../components/CongratsBuldi";
import { scheduleCacheCleanup } from "../functions/cron"
const MemoizedGuessBarShadow = memo(GuessBar);

interface BulderData {
  name: string;
  id: number;
}


export default function BuldiGuess() {
  const [bulderId, setBulderId] = useState(0);
  const [bulders, setBulders] = useState<BulderData[]>();
  const [bulderToGuess] = useState<number>(1)
  const [brightness, setBrightness] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [bulderFounded, setBulderFounded] = useState<boolean>(false)

  useEffect(() => {
    scheduleCacheCleanup();
  }, []);

  const handleChildDataId = (data: number) => {
    setBulderId(data);
    brightness < 100 && setBrightness(brightness + 1);
  };

  const handleChildDataPokemons = (data: BulderData[]) => {
    setBulders(data);
  };

  useEffect(() => {
    if (bulderToGuess && bulders && bulders.length > 0) {
      if (bulders.reverse()[0].id === bulderToGuess || bulders[0].id === bulderToGuess){
        ParticlesConfetti; 
        setBulderFounded(true);
        setBrightness(100)
        setShowConfetti(true);
        setShowCongrats(true);
      }
    }
  }, [bulders, bulderToGuess]);


  return (
    <div>
      <div>
        <Navbar activeItem="shadow" />
          <CongratsBuldi
            active={showCongrats}
          />
          <ParticlesConfetti 
            active={showConfetti} 
          />
        <section className="classic-body" style={{ opacity: showCongrats ? '0.3' : '1' }}>
            <div className="text" style={{ display: showCongrats ? 'none' : 'flex' }}>
              <h1> Devine ton / ta collègue </h1>
              <p>
              Réussirez-vous à retrouver la personne qui se cache sous cette ombre.
              </p>
            </div>
          
          <img
            className={'imageToGuess'}
            style={{filter: `brightness(${brightness}%)`}}
            src={`https://pokeguess.fun/assets/images/Flo.png`} 
            alt={'bulder.png'} 
          />
          <AutoCompleteGuessBuldi
            onData={handleChildDataId}
            bulderFound={bulderFounded}
          />
          <MemoizedGuessBarShadow id={bulderId} onData={handleChildDataPokemons} />
        </section>
      </div>
      <Footer />
    </div>
  );
}
