var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log(456);
    res.status(200).send('respond with a resource youna');
});

router.use('/arduino', require('./arduino'));
router.use('/selectarduino', require('./selectarduino'));

module.exports = router;