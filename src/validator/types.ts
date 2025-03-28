import type { ValidationInterface } from '~/validator/interfaces.ts';

import ValidationEnum from '~/validator/enums/ValidationEnum.ts';

/**
 * Validation that binds the validation logic with parameters
 * 
 * @type ValidationType
 */ 
export type ValidationType = {
  target: ValidationInterface;
  parameters?: unknown[];
};

/**
 * The result of the validation
 * 
 * @type ValidationResultType
 */ 
export type ValidationResultType = {
  key: ValidationEnum;
  name: string;
  parameters?: unknown;
};

export default {};