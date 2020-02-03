import { ApolloServer } from 'apollo-server-express';
import UserSelfAPI from './user-self-api';
import typeDefs from './schema';

//TrackerApp.Resolvers

const resolvers: any = {
  Query: {
    activities: (_source: any, { year }: any, { dataSources }: any) => dataSources.userSelfAPI.getCheckins(year),
  },
};

const apolloServer = (params: any) => new ApolloServer({ 
  typeDefs, 
  resolvers, 
  dataSources: () => {
    return {
      userSelfAPI: new UserSelfAPI(params),
    };
  } 
});

export default apolloServer;





// const data: Array<TrackerApp.Activity> = [
//   {
//     date: '2019-03-10',
//     type: ActivityType.Workout,
//   },
//   {
//     date: '2019-05-10',
//     type: ActivityType.Workout,
//   },
//   {
//     date: '2019-03-10',
//     type: ActivityType.Other,
//   }
// ];