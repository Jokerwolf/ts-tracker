import React from 'react';
import { eachDay, endOfMonth, getDate, format } from 'date-fns';

import Month from './month/Month.component';

import './calendar.scss';

type Props = {
  year: number;
  months?: Array<number>;
};

const getMonths = (month: Array<number> | undefined) => month || Array.from(new Array(12), (_, i) => i);

const getMonth = (year: number, month: number) => {
  const start = new Date(year, month, 1);

  const end = new Date(year, month, getDate(endOfMonth(start)));
  return eachDay(
    start,
    end
  );
};

const Calendar = (props: Props) => {
  const { year } = props;
  const months = getMonths(props.months);

  return (
    <div className="calendar">
      {months.map(month => {
        const name = format(new Date(year, month, 1), 'MMM');
        const days = getMonth(year, month);
        return (
          <Month name={name} days={days}/>
        );
      })}
    </div>
  );
};

export default Calendar;
