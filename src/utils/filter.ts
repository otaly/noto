export const nonNullableFilter = <T>(item: T): item is NonNullable<T> =>
  item != null;
