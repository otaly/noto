import { GraphQLResult } from '@aws-amplify/api-graphql';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AwaitedReturnType<T extends (...args: any) => any> = Awaited<
  ReturnType<T>
>;

export type SubscriptionResult<T> = {
  value: GraphQLResult<T>;
};
