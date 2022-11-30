import React from 'react';

import ManageChit from './ManageChit'
import classes from './ChitList.module.css';

const ChitManage = (props) => {
  return (
    <ul className={classes['chits-list']}> 
      {props.chits.map((chit) => (
        <ManageChit
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

export default ChitManage;