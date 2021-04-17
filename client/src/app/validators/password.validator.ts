import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  return password && confirmPassword && password === confirmPassword ? { passwordMatches: true } : null;
};
