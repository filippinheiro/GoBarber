import { ValidationError } from 'yup';

interface ErrorsMap {
  [key: string]: string;
}

export default function getValidationError(err: ValidationError): ErrorsMap {
  const validationErrorsMap: ErrorsMap = {};

  err.inner.forEach((error) => {
    validationErrorsMap[error.path] = error.message;
  });
  return validationErrorsMap;
}
