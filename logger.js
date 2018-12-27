const show = false

const formatError = (error) => {
  if (show) {
    console.log('formatError', error);
  }
  return error;
}

const formatResponse = (response) => {
  if (show) {
    console.log('formatResponse', response);
  }
  return response
}

module.exports = {
  formatError,
  formatResponse
}
