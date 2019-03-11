import React from 'react';
import { cond, complement } from 'ramda';
import { format } from 'date-fns';

import './day.scss';

type Props = {
  date: Date
};

const types = ['legs', 'arms', 'chest', 'back'];

function getClass(tags?: Array<any>, emptyDay?: boolean) {
  return (tags || [])
    .map(tag => types[tag.type])
    .filter(x => x)
    .concat(emptyDay ? ['empty-day'] : ['day'])
    .join(' ');
}

const Day = (props: Props) => {
  const { date } = props;
  const emptyDay = (date?: Date) => date === undefined || date === null;

  return cond([
    [emptyDay, () => <div className={getClass()} />],
    [
      complement(emptyDay),
      () => (
        <div className={getClass()}>
          {format(date, 'DD')}
        </div>
      ),
    ],
  ])(date);
};

export default Day;
