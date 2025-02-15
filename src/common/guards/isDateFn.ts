export const isDateFn = (x: any): x is Date => {
  return x && Object.prototype.toString.call(x) === '[object Date]';
};

export default isDateFn;
