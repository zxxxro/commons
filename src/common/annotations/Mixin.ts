import type { AnnotationInterface } from '~/decorator/interfaces.ts';
import type { DecorationType, DecoratorFunctionType } from '~/decorator/types.ts';
import type { ArtifactType } from '~/common/types.ts';

import Decorator from '~/decorator/services/Decorator.ts';

export class Mixin implements AnnotationInterface {
  onAttach<P>(artifact: ArtifactType, decoration: DecorationType<P & DecoratorFunctionType[]>): any {
    
    if (decoration.parameters) {
      for (let index = 0; index < decoration.parameters.length; index++) {
        artifact.target = decoration.parameters[index](artifact.target, decoration.context)
      }
    }

    return artifact.target
  }
}

export default (annotations: DecoratorFunctionType[]): DecoratorFunctionType => Decorator.apply(Mixin, annotations);