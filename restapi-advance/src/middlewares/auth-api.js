const { descriptCrypto, isValidateSecret } = require('../../modules/auth-api/index');

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
    // let decryptData = descriptCrypto(apiKey);
    // try {
    //     decryptData = JSON.parse(decryptData);
    //     let timestamp = decryptData.timestamp;
    //     let secret = decryptData.secret;
    //     payload.timestamp = timestamp;

    //     let payloadPlanText = JSON.stringify(payload);

    //     // check payload hash with bcrypt
    //     // let match = await bcrypt.compare(payloadPlanText, secret);
    //     let match = await isValidateSecret(payloadPlanText, secret)
    //         .then(status => {
    //             return status;
    //         })
    //         .catch(err => {
    //             console.log(err);
    //             return false;
    //         })

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