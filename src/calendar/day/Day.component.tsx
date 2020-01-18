import React, { useState } from 'react';
import { cond, complement, isNil } from 'ramda';
import { format } from 'date-fns';

import styles from './day.module.scss';

export type CustomDay = Date; 

type DayType = 'none' | 'red' | 'yellow' | 'green' | 'workout';

type Props = {
  date: CustomDay
  inPeriod: boolean;
  dayType: any;
};

const getClass = (types?: Array<DayType>) => 
  (types || [])
    .map(type => styles[type])
    .filter(x => x)
    .join(' ');

const Day = (props: Props) => {
  const dayClick = console.log;
  const { date, inPeriod, dayType } = props;
  
  console.log(date, inPeriod, dayType);

  return cond([
    [isNil, (_) => <div className={styles['empty-day']} />],
    [
      complement(isNil),
      (date) => (
        <div className={`${styles['day']} ${getClass([dayType])}`} onClick={dayClick}>
          <span className="indicator"></span>
          {format(date, 'DD')}
        </div>
      ),
    ],
  ])(date);
};

export default Day;
