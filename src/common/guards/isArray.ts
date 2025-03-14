export const isArray = <T>(x: unknown): x is Array<T> => {
  return Array.isArray(x);
};

export default isArray;
