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
    console.log('다이어리 집어넣기');
    if(!req.body.userIdx){
        res.status(400).send(utils.successFalse(statusCode.BAD_REQUEST),responseMessage.NULL_VALUE);
    }else{
        const diaryInfo={
            title: req.body.title,
            content: req.body.content,
            today: req.body.today,
            userIdx: req.body.userIdx,
            image_name: req.body.image_name,
            image_copied: req.body.image_copied
        }
        
        const insertDiaryQuery = 'INSERT INTO diary(title, content, today, userIdx, image_name, image_copied) VALUES(?,?,?,?,?,?)';
        const insertDiaryResult = await db.queryParam_Parse(insertDiaryQuery, 
            [diaryInfo.title, diaryInfo.content, diaryInfo.today, diaryInfo.userIdx, diaryInfo.image_name, diaryInfo.image_copied]);

        if(!insertDiaryResult){
            res.status(500).send(utils.successFalse(statusCode.INTERNAL_SERVER_ERROR, responseMessage.FAILED_INSERT_DIARY));
        }else{
            res.status(200).send(utils.successTrue(statusCode.OK, responseMessage.INSERT_DIARY));
        }
    }
});

module.exports = router;