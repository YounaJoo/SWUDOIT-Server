var express = require('express');
var router = express.Router();

const utils = require('../utils/utils');
const statusCode = require('../utils/statusCode');
const responseMessage = require('../utils/responseMessage');
const db = require('../../module/pool');

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/', async(req, res) => {
    console.log('user ID Idx 찾기');
    if(!req.body.userIdx){
        res.status(200).send(utils.successFalse(statusCode.BAD_REQUEST),responseMessage.NULL_VALUE);
    }else{
        const selectDiaryCountQuery = 'SELECT COUNT(*) AS COUNT FROM diary WHERE userIdx=?';
        const selectDiaryCountrResult=await db.queryParam_Parse(selectDiaryCountQuery,req.body.userIdx);

        if(!selectDiaryCountrResult){
            res.status(400).send(utils.successFalse(statusCode.INTERNAL_SERVER_ERROR,responseMessage.FAILED_SELECT_USERIDX));
        }else{
            res.status(200).send(utils.successTrue(statusCode.OK, responseMessage.SELECT_USERIDX, selectDiaryCountrResult[0].COUNT));
        }
    }
});

module.exports = router;