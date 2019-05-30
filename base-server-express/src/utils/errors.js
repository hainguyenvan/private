const { ErrorType } = require('../config/error-type');

const getErrorCode = errorName => {
    return ErrorType[errorName];
}

module.exports = getErrorCode