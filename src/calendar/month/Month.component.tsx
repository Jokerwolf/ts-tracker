import React from 'react';
import { head, last, cond, isEmpty, complement } from 'ramda';
import { startOfWeek, endOfWeek, eachDay, format } from 'date-fns';

import Day from '../day/Day.component';

import styles from './month.module.scss';

type Props = {
  name: string;
  days: Array<Date>;
};

const now = new Date();
const daysOfWeek = eachDay(startOfWeek(now), endOfWeek(now)).map(x =>
  format(x, 'dd')
);

const prefixDays = (days: Array<Date>) =>
  cond([
    [
      complement(isEmpty),
      (days: Array<Date>) => new Array(parseInt(format(head(days)!, 'd'))),
    ],
  ])(days);

const postfixDays = (days: Array<Date>) =>
  cond([
    [
      complement(isEmpty),
      (days: Array<Date>) => new Array(6 - parseInt(format(last(days)!, 'd'))),
    ],
  ])(days);

const Month = (props: Props) => {
  const { days, name } = props;
  const shiftedDays = [...prefixDays(days), ...days, ...postfixDays(days)];
  return (
    <div className={styles.month}>
      <div className={styles.name}>{name}</div>
      <div className={styles['days-of-week']}>
        {daysOfWeek.map((x, ind) => (
          <div key={`dow_${ind}`} className={styles['day-of-week']}>
            {x}
          </div>
        ))}
      </div>
      <div className={styles.days}>
        {shiftedDays.map((date: Date, i: number) => (
          <Day key={i} date={date} />
        ))}
      </div>
    </div>
  );
};

export default Month;
