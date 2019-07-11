const crypto = require("crypto");
const bcrypt = require('bcrypt');
const path = require("path");
const fs = require("fs");

var encryptStringWithRsaPublicKey = function(toEncrypt, relativeOrAbsolutePathToPublicKey) {
    let absolutePath = path.resolve(relativeOrAbsolutePathToPublicKey);
    var publicKey = fs.readFileSync(absolutePath, "utf8");
    var buffer = Buffer.from(toEncrypt);
    var encrypted = crypto.publicEncrypt(publicKey, buffer);
    return encrypted.toString("base64");
};

var decryptStringWithRsaPrivateKey = function(toDecrypt, relativeOrAbsolutePathtoPrivateKey) {
    var absolutePath = path.resolve(relativeOrAbsolutePathtoPrivateKey);
    var privateKey = fs.readFileSync(absolutePath, "utf8");
    var buffer = Buffer.from(toDecrypt, "base64");
    var decrypted = crypto.privateDecrypt(privateKey, buffer);
    return decrypted.toString("utf8");
};


let publicKey = './keys/public.key.pem';
let privateKey = './keys/private.key.pem';

let data = {
    id: 1
};
data.timestamp = 1562846400;
let hash = bcrypt.hashSync(JSON.stringify(data), 10);
data.secret = hash;

let encryptString = encryptStringWithRsaPublicKey(JSON.stringify(data), publicKey);
let decryptString = decryptStringWithRsaPrivateKey(encryptString, privateKey);
console.log('encrypt: ', encryptString);
console.log('decrypt: ', decryptString);