const express = require('express');
const router = express.Router();
const connection = require('./../modules/dbConnection');
const utilFunc = require('./../modules/utilityFunc')
const test = require('../modules/test');

// capture report
router.post('/reports', (req, res) => {
    let reportID = utilFunc.generateID()
    data = {
        'user_id': req.body.userID,
        'market_id': req.body.marketID,
        'cmdty_id': req.body.cmdtyID,
        'market_type': req.body.marketType,
        'market_name': req.body.marketName,

        'cmdty_name': req.body.cmdtyName,
        'price_unit': req.body.priceUnit,
        'conv_factor': req.body.convFctr,
        'price': req.body.price,
        'report_id': reportID
    };
    if (test.verifyDataType(data)) {
        res.send('data not in correct format')
    }
    console.log(data);
    connection.connection.query('INSERT INTO `report_detail` SET ?', [data], (err, result) => {
        if (err) throw err;
        let response = {
            "status": "success",
            "reportID": reportID
        }
        return res.json(response);
    })
})

// send aggregate report
router.get('/reports', (req, res) => {
    let _id = req.query.reportID;
    console.log(_id, '==========');
    connection.connection.query('SELECT `market_id`,`cmdty_id`,`market_name`,`cmdty_name` FROM `report_detail` WHERE `report_id` =? LIMIT 1;', [_id], (err, queryResult) => {
        if (err) throw err;
        console.log(queryResult, '-----------');
        let marketID = queryResult[0].market_id;
        let cmdtyID = queryResult[0].cmdty_id;
        let marketName = queryResult[0].market_name;
        let cmdtyName = queryResult[0].cmdty_name;

        connection.connection.query('SELECT * FROM `report_detail` WHERE `market_id`=? AND`cmdty_id`=?;', [marketID, cmdtyID], (err, result) => {
            if (err) throw err;
            let totalUnitPrice = 0;
            let users = [];
            for (i = 0; i < result.length; i++) {
                totalUnitPrice += parseFloat(result[i].price) / parseFloat(result[i].conv_factor)
                users.push(result[i].user_id)
            }
            let timestamp = new Date().getTime();
            let response = {
                _id,
                cmdty_name: cmdtyName,
                cmdty_id: cmdtyID,
                market_id: marketID,
                market_name: marketName,
                users,
                timestamp,
                priceUnit: "Kg",
                price: parseFloat(totalUnitPrice / result.length),
            };
            res.send(response);
        })
    })
})


module.exports = router;