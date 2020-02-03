import React from 'react';
import { cond, complement, isNil } from 'ramda';
import { format } from 'date-fns';

import styles from './day.module.scss';

type Props = {
  date: Date;
  activity: any;
};

function getClass(emptyDay: boolean, activity?: any) {
  // return (tags || [])
  //   .map(tag => styles[tag.type])
  //   .filter(x => x)
  //   .concat(emptyDay ? [styles['empty-day']] : styles['day'])
  //   .join(' ');
  return (isNil(activity) ? [] : [styles['legs']])
    .concat(emptyDay ? [styles['empty-day']] : styles['day'])
    .join(' ');
}

const emptyDay: (x: Date) => boolean = isNil;

const dayClick = (e: any) => { console.log(e); };

const Day = (props: Props) => {
  const { date } = props;

  return cond<Date, JSX.Element>([
    [emptyDay, () => <div className={getClass(true)} />],
    [
      complement(emptyDay),
      () => (
        <div className={getClass(false, props.activity)} onClick={dayClick}>
          {format(date, 'DD')}
        </div>
      ),
    ],
  ])(date);
};

export default Day;
