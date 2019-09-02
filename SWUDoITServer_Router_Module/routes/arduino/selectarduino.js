var express = require('express');
var router = express.Router();

const utils = require('../utils/utils');
const statusCode = require('../utils/statusCode');
const responseMessage = require('../utils/responseMessage');
const db = require('../../module/pool');

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/', async(req, res)=>{
    console.log(req.body.userIdx);
    if(!req.body.userIdx){
        res.status(200).send(utils.successFalse(statusCode.BAD_REQUEST),responseMessage.NULL_VALUE);
    }else{
        const selectArduinoCountQuery = 'SELECT * FROM arduinoStates WHERE userIdx = 2';
        const selectArduinoCountResult = await db.queryParam_Parse(selectArduinoCountQuery);

        if(!selectArduinoCountResult){
            res.status(400).send(utils.successFalse(statusCode.INTERNAL_SERVER_ERROR,responseMessage.FAILED_SELECT_USERIDX));
        }else{
            const returnData={
                temp: selectArduinoCountResult[0].temp,
                humi: selectArduinoCountResult[0].humi,
                gas : selectArduinoCountResult[0].gas,
                sound: selectArduinoCountResult[0].sound,
                stl: selectArduinoCountResult[0].stl
            }
            res.status(200).send(utils.successTrue(statusCode.OK, responseMessage.SELECT_USERIDX, returnData));
        }
    }
});

module.exports = router;