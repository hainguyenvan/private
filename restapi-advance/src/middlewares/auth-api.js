const crypto = require("crypto");
const bcrypt = require('bcrypt');

const Config = require('../config/config');
const RSAKey = require('../config/rsa-key');

const encryptString = function(toEncrypt) {
    let buffer = Buffer.from(toEncrypt);
    let encrypted = crypto.publicEncrypt(RSAKey.PUBLIC_KEY, buffer);
    return encrypted.toString("base64");
};

const encryptBcrypt = function(data) {
    let hash = bcrypt.hashSync(data, Config.SALT_ROUNDS);
    return hash;
}

const decryptString = function(toDecrypt) {
    let buffer = Buffer.from(toDecrypt, "base64");
    let decrypted = crypto.privateDecrypt(RSAKey.PRIAVTE_KEY, buffer);
    return decrypted.toString("utf8");
};


exports.authAPI = async function(req, res, next) {
    // let apiKey = req.headers['api-key'];
    // let payload = req.body;
    // if (apiKey === undefined || apiKey === null || apiKey === '') {
    //     res.send({
    //         status: 401,
    //         msg: `You have not permission to access`
    //     });
    //     return;
    // }
    // let decryptData = decryptString(apiKey);
    // try {
    //     decryptData = JSON.parse(decryptData);
    //     let timestamp = decryptData.timestamp;
    //     let secret = decryptData.secret;
    //     payload.timestamp = timestamp;

    //     let payloadPlanText = JSON.stringify(payload);
    //     let match = await bcrypt.compare(payloadPlanText, secret);

    //     if (!match) {
    //         res.send({
    //             status: 401,
    //             msg: `You have not permission to access`
    //         });
    //         return;
    //     }
    // } catch (ex) {
    //     res.send({
    //         status: 401,
    //         msg: `You have not permission to access`
    //     });
    //     return;
    // }
    next();
};