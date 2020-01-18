import differenceInCalendarDays from 'date-fns/difference_in_calendar_days';

type State = 'red' | 'yellow' | 'green';

function analyse(start: Date, end: Date): State {
  const length = Math.abs(differenceInCalendarDays(start, end));

  console.log('analyze', start, end, length);
  return length < 3 ?
    'green' :
    length < 4 ?
      'yellow' : 'red';
}

export default analyse;