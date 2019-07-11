const path = require('path');
const fs = require('fs');
const NodeRSA = require('node-rsa');

var generateKeyRSA = function() {
    let key = new NodeRSA();
    // 2048 — key length, 65537 open exponent
    key.generateKeyPair(2048, 65537);
    //save keys as pem line in pkcs8
    fs.writeFileSync(path.resolve(__dirname, 'keys', 'private.key.pem'), key.exportKey('pkcs8-private-pem'));
    fs.writeFileSync(path.resolve(__dirname, 'keys', 'public.key.pem'), key.exportKey('pkcs8-public-pem'));
    return true;
};

generateKeyRSA();