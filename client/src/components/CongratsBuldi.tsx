import React, { useState, useEffect } from 'react';
import Countdown from 'react-countdown';

interface CongratsProps {
  active: boolean;
}

const Congrats: React.FC<CongratsProps> = ({active }) => {
  const [secondsUntilMidnight, setSecondsUntilMidnight] = useState(0);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
    const now = new Date(); 
    const midnightToday = new Date(now);
    midnightToday.setHours(24, 0, 0, 0);

    const timeDifference = midnightToday.getTime() - now.getTime();
    const seconds = Math.floor(timeDifference / 1000);

    setSecondsUntilMidnight(seconds);
  }, []);

  return (
    active && (
      <div className='congrats'>
        <h3>Félicitations</h3>
        <p>Tu as trouvé Florianne Alizard en 1 essai !</p>
        <img src={`https://pokeguess.fun/assets/images/buldi/flo.gif`} alt={'bulder gif'} />
       <div className={'pokemon-date'}>
          <p>Prochain bulder dans : </p>
          <Countdown 
            date={Date.now() + secondsUntilMidnight * 1000} 
            zeroPadTime={2}
            daysInHours={true}/>
        </div>
      </div>
    )
  );
}

export default Congrats;
