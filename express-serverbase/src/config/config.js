const Config = {
    // jwt
    SECRET_JWT: 'Cexk6azogyew7DoTOYKgAXtTOP+18VLDQ1MzYoEWxr6Gqbhg+CeK33MuBPdhyz1dlW4VOKE/ce4TTkfI0yGLlTc+kC74BA8WNoySWmmNsBTEgt83f+9WKYNUgYoGUvml3rRlzvNG71bFqcfJa7U+AuCECq8JnPTeMQ4MSuFBZb4i/q91ZPoI/8SDmcvfai1ofyaHc4xauqhq2hrED5zuZsFbiRDY9bo4d4hHPXdBQaUCm/vklx/BxaAL3OLvvNGhULYmbV/v9Yj0xSAqhZMd7b0TJcDYZ+FHrTX7ZCG15M/Sj/amI/auUEKRNYfwL67/Y7zZxgUWLPsZQ48zPBxgeA==',
    EXPIRES_IN_TOKEN: 86400,

    SOCKET_CLIENT_ROOT: 'http://localhost:3001/vietmed',

    // server
    PORT_SEVER: '9000',
    PORT_SOCKET_IO: 3001,

    // dev db
    HOST_DB: '172.104.167.189',
    NAME_DB: 'vietmed',
    PROTOCOL_DB: 'mysql',
    PORT_DB: '9906',
    USERNAME_DB: 'root',
    PASSWD_DB: 'pwd',
}

module.exports = Config;