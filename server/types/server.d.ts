declare namespace TrackerApp {
  type Maybe<T> = T | null;
  
  /** All built-in and custom scalars, mapped to their actual values */
  type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
  };

  enum ActivityType {
    Workout = "WORKOUT",
    Other = "OTHER"
  }

  type Activity = {
    __typename?: "Activity";
    type?: Maybe<ActivityType>;
    date?: Maybe<Scalars["String"]>;
  }

  type Query = {
    __typename?: "Query";
    activities?: Maybe<Array<Maybe<Activity>>>;
  };

  type Resolvers = {
    Query: { [k in keyof Query]: () => Query[k] };
  };
}


// export as namespace TrackerApp;
// export = TrackerApp;