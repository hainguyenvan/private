const { generateKeyRSA, encryptBcrypt, enscriptCrypto, descriptCrypto, isValidateSecret } = require('./index');

// generateKeyRSA();

let data = {
    id: 1,
    timestamp: 1562839200
};
data.secret = encryptBcrypt(JSON.stringify(data));

let enscript = enscriptCrypto(JSON.stringify(data));
let descript = descriptCrypto(enscript);

console.log('enscript:', enscript);
console.log('descript: ', descript);

// isValidateSecret('hihi', enscriptBcryptData)
//     .then(status => {
//         console.log('status validate secret: ', status);
//     })
//     .catch(err => {
//         console.log(err);
//     })