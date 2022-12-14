import { useState } from 'react';
import { add } from 'date-fns';
import classes from './Timer.module.css';

import  Ticker  from './Ticker';

const Timer = () =>{

    const futureDate = add(new Date(), {
        minutes: 30
      });
      
        return (
          <div className={classes.timer}>
            <Ticker futureDate={futureDate} />
          </div>  
        );
}

export default Timer;