const express = require('express');
const router = express.Router();

// root
router.get('/', function (req, res) {
    res.json({
        msg: 'Welcome to service chatio.'
    });
});

require('./user')(router);

module.exports = router;