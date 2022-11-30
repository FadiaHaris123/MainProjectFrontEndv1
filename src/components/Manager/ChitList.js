import React from 'react';

import Chit from './Chit';
import classes from './ChitList.module.css';

const ChitList = (props) => {
  return (
    <ul className={classes['chits-list']}>
      {props.chits.map((chit) => (
        <Chit
          id={chit.id}
          amount={chit.amount}
          chitNumber={chit.chitNumber}
          chitType={chit.chitType}
          days={chit.days}
          members={chit.members}
          startDate={chit.startDate}
        />
      ))}
    </ul>
  );
};

export default ChitList;
