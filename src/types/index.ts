import { GraphQLResult } from '@aws-amplify/api-graphql';

export type SubscriptionResult<T> = {
  value: GraphQLResult<T>;
};
