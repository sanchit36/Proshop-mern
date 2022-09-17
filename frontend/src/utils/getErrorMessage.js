export const getErrorMessage = (error) =>
  error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
