import type { MetadataType } from '~/common/types.ts';

import isObjectFn from '~/common/guards/isObjectFn.ts';

/**
 * Common operations for the metadata
 * 
 * @member {void} set - Set a metadata symbol to a target
 * @member {boolean} has - Checks if the target has the metadata symbol
 * @member {MetadataType | undefined} get - Returns the content of the metadata
 * @member {any} getProperty - Return a metadata property content
 */ 
export class Metadata {
  static set(target: any): void {    
    if (isObjectFn(target) && target.constructor && !target.constructor[Symbol.metadata]) {
      target.constructor[Symbol.metadata] = {}
    } else {
      target[Symbol.metadata] = {}
    }
  }

  static has(target: any): boolean {
    return !!Metadata.get(target)
  }

  static get(target: any): MetadataType | undefined {
    return target[Symbol.metadata] || target.constructor[Symbol.metadata]
  }

  static getProperty(target: any, property: string | symbol): any {
    const metadata = Metadata.get(target)
    return metadata ? metadata[property] : undefined
  }
}

export default Metadata