const Config = {

    // graphql
    GRAPHQL_API: `http://127.0.0.1:9000/api/graphql`,

    // socket
    SOCKET_CLIENT_ROOT: `http://127.0.0.1:3001/vietmed`,

    API_KEY_GRAPHQL: `Cexk6azogyew7DoTOYKgAXtTOP+`,

    // jwt
    SECRET_JWT: 'Cexk6azogyew7DoTOYKgAXtTOP+18VLDQ1MzYoEWxr6Gqbhg+CeK33MuBPdhyz1dlW4VOKE/ce4TTkfI0yGLlTc+kC74BA8WNoySWmmNsBTEgt83f+9WKYNUgYoGUvml3rRlzvNG71bFqcfJa7U+AuCECq8JnPTeMQ4MSuFBZb4i/q91ZPoI/8SDmcvfai1ofyaHc4xauqhq2hrED5zuZsFbiRDY9bo4d4hHPXdBQaUCm/vklx/BxaAL3OLvvNGhULYmbV/v9Yj0xSAqhZMd7b0TJcDYZ+FHrTX7ZCG15M/Sj/amI/auUEKRNYfwL67/Y7zZxgUWLPsZQ48zPBxgeA==',
    EXPIRES_IN_TOKEN: 86400,

    // server
    PORT_SEVER: '9000',
    PORT_SOCKET_IO: 3001,

    // dev db
    HOST_DB: '127.0.0.1',
    NAME_DB: 'restapi',
    PROTOCOL_DB: 'mysql',
    PORT_DB: '3306',
    USERNAME_DB: 'root',
    PASSWD_DB: 'pwd',
}

module.exports = Config;