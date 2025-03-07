import type { TargetPropertyType } from '~/common/types.ts';
import type { DecorationMetadataType } from '~/decorator/types.ts';

export const isDecoratorMetadataFn = (x: any): x is Map<TargetPropertyType, DecorationMetadataType<any>[]> => {
  return typeof x !== 'undefined' && typeof x === 'object'
};

export default isDecoratorMetadataFn;
