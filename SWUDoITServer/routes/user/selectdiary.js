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
    console.log('select Diary');
    if(!req.body.userIdx){
        res.status(400).send(utils.successFalse(statusCode.BAD_REQUEST),responseMessage.NULL_VALUE);
    }else{
        const selectDiarySelectQuery = 'SELECT * FROM diary WHERE userIdx = ?';
        const selectDiarySelectResult = await db.queryParam_Parse(selectDiarySelectQuery, req.body.userIdx);
        
        const titleArray = [];
        const contentArray = [];
        const todayArray = [];
        const image_name_array = [];
        const image_copied_array = [];

        if(!selectDiarySelectResult){
            res.status(500).send(utils.successFalse(statusCode.INTERNAL_SERVER_ERROR,responseMessage.FAILED_SELECT_DIARY));
        }else{
            for(var i = 0; i < req.body.index; i++){
                titleArray.push(selectDiarySelectResult[i].title);
                contentArray.push(selectDiarySelectResult[i].content);
                todayArray.push(selectDiarySelectResult[i].today);
                image_name_array.push(selectDiarySelectResult[i].image_name);
                image_copied_array.push(selectDiarySelectResult[i].image_copied);
            }

            const ti = selectDiarySelectResult[0].title;
            const returnData={
                title: titleArray,
                content: contentArray,
                today: todayArray,
                image_name: image_name_array,
                image_copied: image_copied_array,
            }

            res.status(200).send(utils.successTrue(statusCode.OK, responseMessage.SELECT_DIARY, returnData));
        }
    }
});
module.exports = router;
