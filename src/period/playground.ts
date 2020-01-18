import { compose, tap } from 'ramda';

import { CustomDay } from '../calendar/day/Day.component';

import { isSameYear, getMonth, startOfMonth, endOfMonth, isAfter, isBefore, isSameMonth, setYear } from 'date-fns';

export type Period = {
  start: Date;
  end: Date;
};

function periodsPlayground(periods: Period[], year: number, monthIndex: number, days: CustomDay[]) {
  const result = compose(
    // (periods: Period[]) =>
    //   periods.map(({ start, end }, i) => {
    //     const startIndex = days.findIndex(x => isSameDay(x, start));
    //     const endIndex = days.findIndex(x => isSameDay(x, end));

    //     return days.slice(startIndex, endIndex).map(x => {
    //       const day: CustomDay = new Date(x);
    //       day.inPeriod = i;
    //       return day;
    //     });
    //   }),

    // tap((x) => console.log(x)),

    (periods: Period[]) =>
      periods.map(period => {
        const { start, end } = period;

        const month = new Date(year, monthIndex + 1, 0);

        if (isSameMonth(start, end)) return { ...period, full: period };

        if (isBefore(start, startOfMonth(month))) return { start: startOfMonth(month), end, full: period };
        if (isAfter(end, endOfMonth(month))) return { start, end: endOfMonth(month), full: period };
      }),

    // tap((x) => console.log('>>>', x)),

    (periods: Period[]) =>
      periods.filter(({ start, end }) => {
        const yearDate = setYear(new Date(), year);
        const startMonth = getMonth(start);
        const endMonth = getMonth(end);

        return (isSameYear(yearDate, start) || isSameYear(yearDate, end)) && (startMonth === monthIndex || endMonth === monthIndex);
      }),

    // tap((x) => console.log('>>>', x)),
  )(periods);

  console.log('result', result);

  return result;
}

export default periodsPlayground;