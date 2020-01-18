import React from 'react';
import { range, splitEvery, take } from 'ramda';
import {
  eachDay,
  endOfMonth,
  getDate,
  format,
  addDays,
  subDays,
} from 'date-fns';

import periodsPlayground, { Period } from '../period/playground';

import Month from './month/Month.component';

import styles from './calendar.module.scss';

type Props = {
  year: number;
  months?: Array<number>;
};

const dates = [
  // new Date(2018, 11, 31),

  new Date(2019, 0, 2),
  new Date(2019, 0, 4),
  new Date(2019, 0, 7),
  new Date(2019, 0, 9),
  new Date(2019, 0, 16),
  new Date(2019, 0, 20),
  new Date(2019, 0, 23),
  new Date(2019, 0, 24),
  new Date(2019, 0, 27),
  new Date(2019, 0, 28),
  new Date(2019, 0, 30),
  new Date(2019, 0, 31),

  new Date(2019, 1, 4),
  new Date(2019, 1, 11),
  new Date(2019, 1, 13),
  new Date(2019, 1, 23),

  new Date(2019, 2, 3),
  new Date(2019, 2, 6),
  new Date(2019, 2, 9),
  new Date(2019, 2, 10),
  new Date(2019, 2, 12),
  new Date(2019, 2, 13),
  new Date(2019, 2, 17),
  new Date(2019, 2, 19),
  new Date(2019, 2, 21),
  new Date(2019, 2, 25),
  new Date(2019, 2, 28),

  new Date(2019, 3, 1),
  new Date(2019, 3, 2),
  new Date(2019, 3, 3),
  new Date(2019, 3, 5),
  new Date(2019, 3, 8),
  new Date(2019, 3, 9),
  new Date(2019, 3, 12),
  new Date(2019, 3, 15),
  new Date(2019, 3, 18),
  new Date(2019, 3, 21),
  new Date(2019, 3, 24),
  new Date(2019, 3, 25),
  new Date(2019, 3, 28), 
  
  new Date(2019, 4, 2), 
  new Date(2019, 4, 3), 
  new Date(2019, 4, 6), 
  new Date(2019, 4, 7)
];
const periods: any[] = dates.map((x, i, arr) => {
  if (i + 1 < arr.length) {
    return { start: x, end: arr[i + 1] };
  }

  return;
}).filter(x => x !== undefined);

const getMonths = (month: Array<number> | undefined) => month || range(0, 12);

const getMonthDays = (year: number, month: number) => {
  const start = new Date(year, month, 1);

  const end = new Date(year, month, getDate(endOfMonth(start)));
  return eachDay(start, end);
};

const Calendar = (props: Props) => {
  const { year, months = getMonths(props.months) } = props;

  return (
    <div className={styles.calendar}>
      {months.map(month => {
        const monthName = format(new Date(year, month, 1), 'MMM');
        const days = getMonthDays(year, month);

        const monthPeriods = periodsPlayground(periods, year, month, days);

        return (
          <Month
            key={`month_${monthName}`}
            name={monthName}
            days={days}
            periods={monthPeriods}
          />
        );
      })}
    </div>
  );
};

export default Calendar;
