import { RESTDataSource } from 'apollo-datasource-rest';
import { compose, filter, map, path, project, tap } from 'ramda';
import { ActivityType } from '../types/ActivityType';

type Checkin = { venue: Venue; createdAt: number; };
type Venue = { categories: Array<Category>; };
type Category = { id: string; };

class UserSelfAPI extends RESTDataSource {
  private oauth_token: string;
  private v: string;

  constructor({ oauth_token, v }: { oauth_token: string, v: string }) {
    super();
    this.baseURL = 'https://api.foursquare.com/v2/users/self';
    this.oauth_token = oauth_token;
    this.v = v;
  }

  async getCheckins(year: number) {
    const { oauth_token, v } = this;
    const [ afterTimestamp, beforeTimestamp ] = yearToRange(year);
    
    return this.get('/checkins', { 
      oauth_token, 
      v, 
      afterTimestamp, 
      beforeTimestamp, 
      limit: 250, 
      sort: 'oldestfirst' 
    }).then(mapData, e => console.error(e));
  }
}


//#region Utils
const sportCategory = (category: Category) => category.id === '4bf58dd8d48988d175941735';
const isInSportVenue = (checkin: Checkin) => checkin.venue.categories.some(sportCategory)

const mapData = compose(
  map<Checkin, any>(x => ({ type: ActivityType.Workout, date: x.createdAt })),
  // project(['id', 'createdAt']),
  filter(isInSportVenue),
  // tap<Array<Checkin>>(x => console.log(x)),
  path<Array<Checkin>>(['response', 'checkins', 'items'])
);

const yearToRange = (year: number) => {
  return [
    new Date(year, 0, 1).getTime() / 1000,
    new Date(year, 11, 31).getTime() / 1000,
  ];
};
//#endregion

export default UserSelfAPI;