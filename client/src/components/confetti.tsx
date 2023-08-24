import React from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

interface ParticlesConfettiProps {
  active: boolean; // Ajoutez la prop 'active' attendue dans votre composant
}

const ParticlesConfetti: React.FC<ParticlesConfettiProps> = ({ active }) => {
  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };


  return (
    active && (
      <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        
      }}
    />
  ));
};

export default ParticlesConfetti;
