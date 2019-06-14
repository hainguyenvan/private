const express = require('express');
const router = express.Router();

// root
// router.get('/', function (req, res) {
//     res.json({
//         msg: 'Welcome to service chatio.'
//     });
// });

router.get('/', function(req, res, next) {
	res.render('login.html');
});

router.get('/roomsList', function(req, res, next) {
	res.render('rooms.html');
});

router.get('/chatroom', function(req, res, next) {
	res.render('chatroom.html');
});

require('./user')(router);

require('./room')(router);

require('./messages')(router);

module.exports = router;