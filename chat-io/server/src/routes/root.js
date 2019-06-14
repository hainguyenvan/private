const express = require('express');
const router = express.Router();

// root
router.get('/', function (req, res) {
    res.json({
        msg: 'Welcome to service chatio.'
    });
});

require('./user')(router);

require('./room')(router);

require('./messages')(router);

module.exports = router;