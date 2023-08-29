import { useEffect } from "react";
import confetti from 'canvas-confetti'; 
import math from '../functions/math'
import explosion1 from '../assets/sounds/explosion0.mp3';
import explosion2 from '../assets/sounds/explosion1.mp3';
import explosion3 from '../assets/sounds/explosion2.mp3';

interface ParticlesProp {
  active: boolean;
}

const duration = 2.5 * 1000;
let animationEnd = Date.now() + duration;
const defaults = {
  startVelocity: 25,
  spread: 360,
  ticks: 25,
  zIndex: 3,
  colors: ["#ff4b26", "#ffffff", "#393939"]
};

const ParticlesConfetti = ({ active }: ParticlesProp) => {

  useEffect(() => {
    let interval:number;
    animationEnd = Date.now() + duration;

    if (active) {
      interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(interval);
          return;
        }

        const particleCount = 250 * (timeLeft / duration);

        const soundIndex = Math.floor(Math.random() * 3);
        let selectedSound: HTMLAudioElement;

        if (soundIndex === 0) {
          selectedSound = new Audio(explosion1);
        } else if (soundIndex === 1) {
          selectedSound = new Audio(explosion2);
        } else {
          selectedSound = new Audio(explosion3);
        }

        selectedSound.volume = 0.05;
        selectedSound.play();

        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: math.randomInRange(0.05, 0.45), y:  math.randomInRange(0.20, 0.80) },
          })
        );
        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: math.randomInRange(0.55, 0.95), y: math.randomInRange(0.20, 0.80)  },
          })
        );
      }, 250);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [active]);

  return (
    active && (
      <div>
      </div>
    )
  );
};

export default ParticlesConfetti;
