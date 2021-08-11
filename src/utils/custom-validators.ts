import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { validaCpf } from './utils'

@ValidatorConstraint({ name: 'validarCpf', async: false })
export class ValidarCpf implements ValidatorConstraintInterface {
  validate(cpf: string, args: ValidationArguments) {
    return validaCpf(cpf);
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return 'Invalid Cpf: $value';
  }
}
