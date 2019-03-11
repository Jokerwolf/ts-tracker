import React from 'react';

import Day from '../day/Day.component';

import './month.scss';

type Props = {
  name: string;
  days: Array<Date>;
};

const Month = (props: Props) => {
  const { days, name } = props;

  return (
      <div className="month">
          <div className="name">{name}</div>
          <div className="days-of-week">
              {/* {daysOfWeek.map((x, ind) => <div key={`dow_${ind}`} className="day-of-week">{x}</div>)} */}
          </div>
          <div className="days">
              {days.map((date, i) => (
                <Day key={i} date={date} />
              ))}
          </div>
      </div>
  );
};

export default Month;