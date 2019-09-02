var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log(456);
    res.status(200).send('respond with a resource youna');
});

router.use('/signin', require('./signin'));
router.use('/signup', require('./signup'));

router.use('/selectIdx', require('./selectIdx'));
router.use('/diary', require('./diary'));
router.use('/selectdiary', require('./selectdiary'));

module.exports = router;