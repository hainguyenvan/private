exports.ErrorName = {
    OTHER: 'OTHER',
    AUTHENTICATION: 'AUTHENTICATION'
}

exports.ErrorType = {
    OTHER: {
        status: 501,
        msg: 'Oops! Please try again later about.'
    },
    AUTHENTICATION: {
        status: 401,
        msg: 'Oops! Email or password invalid.'
    }
}