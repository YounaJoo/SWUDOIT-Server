var express = require('express');
var router = express.Router();

const utils = require('../utils/utils');
const statusCode = require('../utils/statusCode');
const responseMessage = require('../utils/responseMessage');
const db = require('../../module/pool');

//var SerialPort = require('serialport');
//var serialPort = new SerialPort("COM5", { baudRate:9600}, false);

var tempStl = 0;
var humiStl = 0;
var gasStl = 0;
var soundStl = 0;
var stringStl = '';

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/', async(req, res)=>{
    if(!req.body.userIdx){
        res.status(400).send(utils.successFalse(statusCode.BAD_REQUEST),responseMessage.NULL_VALUE);
    }else{
        
        const retrunData={
            temp: tempStl,
            humi: humiStl,
            gas: gasStl,
            sound: soundStl,
            stl: stringStl,
        }

        //const selectArduinoQuery = 'SELECT * FROM arduinoStates WHERE userIdx = ?';
        const updateArduinoQuery = 'UPDATE arduinoStates set temp = ' + tempStl + ', humi = ' + humiStl 
        + ', gas = ' + gasStl + ', sound = ' + soundStl + ', stl = ' + null + ' where userIdx = ?';

        const selectArduinoResult = await db.queryParam_Parse(updateArduinoQuery, req.body.userIdx);
        if(!selectArduinoResult){
            res.status(500).send(utils.successFalse(statusCode.INTERNAL_SERVER_ERROR,responseMessage.LOGIN_FAIL));
        }else{
            res.status(200).send(utils.successTrue(statusCode.OK, responseMessage.LOGIN_SUCCESS, retrunData));
        }
    }
});

// serialPort.open(function(){
//     console.log('Arduino 접속중');
//     serialPort.on('data', function(data) {
//       var stl = "" + data;
//       if(stl.includes('temp')){
//         tempStl = stl.substring(6, stl.length-2);
//       }else if(stl.includes('humi')){
//         humiStl = stl.substring(6, stl.length-2);
//       }else if(stl.includes('gas')){
//         gasStl = stl.substring(5, stl.length-2);
//       }else if(stl.includes('sound')){
//         soundStl = stl.substring(7, stl.length-2);
//       }else{
//         stringStl = stl.substring(0, stl.length-2);
//       }
//     });
// });

module.exports = router;