const express = require('express');
const router = express.Router();

// root
router.get('/', function(req, res) {
    res.send({
        msg: 'Welcome to our api !'
    });
});

require('./account')(router);
require('./post')(router);
require('./role')(router);
require('./user-role')(router);

module.exports = router;