const successModal = ({ result = {}, meta = {} }) => {
  return {
    success: true,
    data: result,
    meta,
    error: 0,
  }
}

const failModal = ({ result = {}, error = {} }) => {
  return {
    success: false,
    data: result,
    error: error || result.error,
  }
}

module.exports = {
  successModal,
  failModal
}