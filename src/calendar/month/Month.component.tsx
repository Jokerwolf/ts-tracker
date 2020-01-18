import React from 'react';
import { head, last, cond, isEmpty, complement, propOr } from 'ramda';
import {
  startOfWeek,
  endOfWeek,
  eachDay,
  format,
  isWithinRange,
  isSameDay,
} from 'date-fns';

import lengthAnalysis from '../../period/length-analysis';
import Day, { CustomDay } from '../day/Day.component';

import styles from './month.module.scss';

type Props = {
  name: string;
  days: Array<CustomDay>;
  periods: any[];
};

const now = new Date();

const daysOfWeek = eachDay(startOfWeek(now), endOfWeek(now)).map(x =>
  format(x, 'dd')
);

const prefixDays = (days: Array<CustomDay>) =>
  cond([
    [
      complement(isEmpty),
      (days: Array<CustomDay>) => new Array(parseInt(format(head(days)!, 'd'))),
    ],
  ])(days);

const postfixDays = (days: Array<CustomDay>) =>
  cond([
    [
      complement(isEmpty),
      (days: Array<CustomDay>) =>
        new Array(6 - parseInt(format(last(days)!, 'd'))),
    ],
  ])(days);

const Month = (props: Props) => {
  const { days, name, periods } = props;

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
        {shiftedDays.map((date: CustomDay, i: number) => {
          const analysis = periods.map(x => {
            const inPeriod = isWithinRange(date, x.start, x.end);

            // console.log(date, inPeriod);

            return [
              inPeriod,
              inPeriod
                ? isSameDay(x.full.start, date) || isSameDay(x.full.end, date)
                  ? 'workout'
                  : lengthAnalysis(x.full.start, x.full.end)
                : 'none',
            ];
          });

          const inPeriod = analysis.some((x: any) => x[0]);
          const dayType = propOr('none', '1')(analysis.find((x: any) => x[0]));

          return (
            <Day
              key={`${inPeriod}_${i}`}
              date={date}
              inPeriod={inPeriod}
              dayType={dayType}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Month;
