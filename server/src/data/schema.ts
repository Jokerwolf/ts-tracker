import { gql } from 'apollo-server-express';

const schema = gql`
enum ActivityType {
  WORKOUT,
  OTHER
}

type Activity {
  type: ActivityType,
  date: String
}

type Query {
  activities(year: Int!): [Activity]
}
`;

export default schema;