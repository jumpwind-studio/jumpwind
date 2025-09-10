/** Makes specified keys required in a type */
export type PickRequired<T, K extends keyof T> = T & Required<Pick<T, K>>;

/** Makes specified keys optional in a type */
export type PickPartial<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;
