"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const ActivityType_1 = require("./types/ActivityType");
// import { TrackerApp } from './types/server';
const typeDefs = apollo_server_1.gql `
enum ActivityType {
  WORKOUT,
  OTHER
}

type Activity {
  type: ActivityType,
  date: String
}

type Query {
  activities: [Activity]
}
`;
const data = [
    {
        date: '2019-03-10',
        type: ActivityType_1.ActivityType.Workout,
    },
    {
        date: '2019-05-10',
        type: ActivityType_1.ActivityType.Workout,
    },
    {
        date: '2019-03-10',
        type: ActivityType_1.ActivityType.Other,
    }
];
const resolvers = {
    Query: {
        activities: () => data
    },
};
const apolloServer = new apollo_server_1.ApolloServer({ typeDefs, resolvers });
apolloServer.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
//# sourceMappingURL=index.js.map