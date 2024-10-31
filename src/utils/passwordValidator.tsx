// VALIDATION RESULT FOR PASSWORD
interface PassValidation {
    isValid: boolean;
    message: string;
  }

// VALIDATE IF PASSWORD IS 8 - 20 CHARACTERS LONG
function validatePasswordLength(password: string): PassValidation {
    if (password.length >= 8 && password.length <= 20) {
        return { isValid: true, message: '' };
    } else {
        return { 
        isValid: false, 
        message: 'Password is too short.' 
        };
    }
}

// VALIDATE IF THE PASSWORD HAD ATLEAST ONE UPPERCASE AND LOWERCASE LETTER
function validatePasswordCase(password: string): PassValidation {
    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
      return {
        isValid: false,
        message: 'Password needs a lowercase and an uppercase letter.',
      };
    }
    return { isValid: true, message: '' };
  }

  // VALIDATE IF THE PASSWORD HAD ATLEAST A NUMBER
function validatePasswordNumber(password: string): PassValidation {
    if (!/[0-9]/.test(password)) {
      return {
        isValid: false,
        message: 'Password needs at least a number.',
      };
    }
    return { isValid: true, message: '' };
  }

  // Aggregate all validations
export function validatePassword(password: string): PassValidation[] {
    const validations: PassValidation[] = [];
    validations.push(validatePasswordLength(password));
    validations.push(validatePasswordCase(password));
    validations.push(validatePasswordNumber(password));

    return validations.filter(validation => !validation.isValid);
}