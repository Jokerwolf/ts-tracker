import rp from 'request-promise';

const getActivities = (year: number) => rp({
  url: 'http://localhost:9000/gql',
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: `{ activities(year: ${year}) { type, date } }` })
});

export default getActivities;
