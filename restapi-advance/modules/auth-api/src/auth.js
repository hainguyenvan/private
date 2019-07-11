const path = require('path');
const fs = require('fs');

const NodeRSA = require('node-rsa');
const crypto = require("crypto");
const bcrypt = require('bcrypt');

const ROOT_DIR_KEYS = require('path').resolve(__dirname, '../');
const DIR_PRIVATE_KEY = ROOT_DIR_KEYS + '/keys/private.key.pem';
const DIR_PUBLIC_KEY = ROOT_DIR_KEYS + '/keys/public.key.pem';
const SALT_ROUNDS = 10;


exports.encryptBcrypt = function(enscriptData) {
    let hash = bcrypt.hashSync(enscriptData, SALT_ROUNDS);
    return hash;
}

exports.enscriptCrypto = function(enscriptData) {
    let publicKey = fs.readFileSync(DIR_PUBLIC_KEY, "utf8");
    let buffer = Buffer.from(enscriptData);
    let encrypted = crypto.publicEncrypt(publicKey, buffer);
    return encrypted.toString("base64");
}

exports.descriptCrypto = function(descriptData) {
    let buffer = Buffer.from(descriptData, "base64");
    let privateKey = fs.readFileSync(DIR_PRIVATE_KEY, "utf8");
    let decrypted = crypto.privateDecrypt(privateKey, buffer);
    return decrypted.toString("utf8");
}


exports.isValidateSecret = function(planText, secret) {
    return new Promise(async(fulfill, reject) => {
        try {
            let match = await bcrypt.compare(planText, secret);
            fulfill(match);
        } catch (err) {
            reject(err);
        }
    });
}

exports.generateKeyRSA = function() {
    return new Promise((fulfill, reject) => {
        try {
            let key = new NodeRSA();
            // 2048 — key length, 65537 open exponent
            key.generateKeyPair(2048, 65537);
            //save keys as pem line in pkcs8
            fs.writeFileSync(path.resolve(ROOT_DIR_KEYS, 'keys', 'private.key.pem'), key.exportKey('pkcs8-private-pem'));
            fs.writeFileSync(path.resolve(ROOT_DIR_KEYS, 'keys', 'public.key.pem'), key.exportKey('pkcs8-public-pem'));
            let keyDir = ROOT_DIR_KEYS + '/keys';
            fulfill(keyDir);
        } catch (ex) {
            console.log(ex);
            reject(ex);
        }

    })
};