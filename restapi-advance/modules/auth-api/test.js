const { generateKey, encryptBcrypt, enscriptCrypto, descriptCrypto, isValidateSecret } = require('./index');

// generateKey();

let enscript = enscriptCrypto('hihi');
let descript = descriptCrypto(enscript);
let enscriptBcryptData = encryptBcrypt('hihi');

console.log('enscript:', enscript);
console.log('descript: ', descript);

isValidateSecret('hihi', enscriptBcryptData)
    .then(status => {
        console.log('status validate secret: ', status);
    })
    .catch(err => {
        console.log(err);
    })