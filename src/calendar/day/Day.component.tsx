import React from 'react';
import { cond, complement, isNil, tap, compose } from 'ramda';
import { format } from 'date-fns';

import styles from './day.module.scss';

type Props = {
  date: Date
};

function getClass(emptyDay?: boolean, tags?: Array<any>) {
  return (tags || [])
    .map(tag => styles[tag.type])
    .filter(x => x)
    .concat(emptyDay ? [styles['empty-day']] : styles['day'])
    .join(' ');
}

const emptyDay: (x: Date) => boolean = isNil;

const dayClick = (e: any) => { console.log(e); };

const Day = (props: Props) => {
  const { date } = props;

  return cond([
    [emptyDay, () => <div className={getClass(true)} />],
    [
      complement(emptyDay),
      () => (
        <div className={getClass()} onClick={dayClick}>
          {format(date, 'DD')}
        </div>
      ),
    ],
  ])(date);
};

export default Day;
