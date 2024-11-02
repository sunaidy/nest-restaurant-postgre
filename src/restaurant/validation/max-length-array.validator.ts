import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'maxLengthArray', async: false })
export class MaxLengthArrayValidator implements ValidatorConstraintInterface {
  validate(arr: any[], args: ValidationArguments) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [errorMessage] = args.constraints;
    const minAge = arr.map((obj) => {
      if (obj.age < 18) return obj;
    });
    return Array.isArray(arr) && !minAge;
  }

  defaultMessage(args: ValidationArguments) {
    const [errorMessage] = args.constraints;
    return errorMessage;
  }
}
