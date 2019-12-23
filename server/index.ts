import { ApolloServer } from 'apollo-server';
import { ActivityType } from './types/ActivityType';
import { typeDefs } from './schema.graphql';
// import { TrackerApp } from './types/server';

const data: Array<TrackerApp.Activity> = [
  {
    date: '2019-03-10',
    type: ActivityType.Workout,
  },
  {
    date: '2019-05-10',
    type: ActivityType.Workout,
  },
  {
    date: '2019-03-10',
    type: ActivityType.Other,
  }
];

const resolvers: TrackerApp.Resolvers = {
  Query: {
    activities: () => data
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

apolloServer.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});