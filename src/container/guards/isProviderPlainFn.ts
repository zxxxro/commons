import { ProviderPlainType } from '~/container/types.ts';

export const isProviderPlainFn = (x: any): x is ProviderPlainType => {
  return x && x.name && x.value;
};

export default isProviderPlainFn;
