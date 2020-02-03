import React, { useEffect, useState } from 'react';
import { compose, map, path, range, tap } from 'ramda';
import { eachDay, endOfMonth, getDate, format } from 'date-fns';

import Month from './month/Month.component';

import styles from './calendar.module.scss';
import getActivities from '../data/activities';

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

  const [activities, setActivities] = useState([]);
  
  useEffect(() => {
    getActivities(year).then(
      compose(
        setActivities,
        tap((x: any) => console.log('>>>>', x)),
        map((item: any) => ({ ...item, date: new Date(item.date * 1000) })), 
        path<any>(['data', 'activities']),
        JSON.parse,
      )
    )
  }, [year]);

  return (
    <div className={styles.calendar}>
      {months.map(month => {
        const monthName = format(new Date(year, month, 1), 'MMM');
        const days = getMonthDays(year, month);
        
        return <Month name={monthName} days={days} activities={activities}/>;
      })}
    </div>
  );
};

export default Calendar;
