import React from 'react';
import { range } from 'ramda';
import { eachDay, endOfMonth, getDate, format } from 'date-fns';

import Month from './month/Month.component';

import styles from './calendar.module.scss';

type Props = {
  year: number;
  months?: Array<number>;
};

const getMonths = (month: Array<number> | undefined) => month || range(0, 12);

const getMonthDays = (year: number, month: number) => {
  const start = new Date(year, month, 1);

  const end = new Date(year, month, getDate(endOfMonth(start)));
  return eachDay(
    start,
    end
  );
};

const Calendar = (props: Props) => {
  const { year, months = getMonths(props.months) } = props;

  return (
    <div className={styles.calendar}>
      {months.map(month => {
        const monthName = format(new Date(year, month, 1), 'MMM');
        const days = getMonthDays(year, month);
        
        return <Month name={monthName} days={days}/>;
      })}
    </div>
  );
};

export default Calendar;
