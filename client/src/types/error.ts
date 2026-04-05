interface ApiError {
  message: string;
}

function isApiError(error: unknown): error is ApiError {
  return typeof error === 'object' 
         && error !== null 
         && 'message' in error 
         && typeof (error as any).message === 'string';
}

export function getErrorMessage(error: unknown): string {
  if (isApiError(error)) {
    return error.message;
  }
  return 'Произошла неизвестная ошибка';
}