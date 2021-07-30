const qs = require('query-string');
const http = require('http');
const { randomInt } = require('crypto');
const connection = require('./dbConnection');
const { genAlphaString } = require('./../modules/utilityFunc');



function verifyReport(data) {
    let result = false;
    if (typeof (data.user_id) === 'string' && typeof (data.market_id) === 'string' && typeof (data.cmdty_id) === 'string' && typeof (data.market_name) === 'string' && typeof (data.cmdty_name) === 'string' && typeof (data.market_type) === 'string' && typeof (data.price_unit) === 'string' && typeof (data.price) === 'number' && typeof (data.conv_factor) === 'number')
        result = true
    return result;
}

async function verifyAPI() {
    let maskReport = {
        userID: genAlphaString(),
        marketID: genAlphaString(),
        cmdtyID: genAlphaString(),
        marketType: genAlphaString(),
        marketName: genAlphaString(),
        cmdtyName: genAlphaString(),
        priceUnit: genAlphaString(),
        convFctr: randomInt(100),
        price: randomInt(100, 25000)
    };
    console.log(maskReport);
    let option = {
        hostname: process.env.SERVER_HOST,
        port: process.env.SERVER_PORT,
        path: '/reports',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': qs.stringify(maskReport).length
        }
    };

    let chunks = [];
    let request = await http.request(option, (response) => {
        console.log('statusCode:', response.statusCode);
        console.log('headers:', response.headers);
        response.on('data', (d) => {
            chunks.push(d);
        });
        response.on('end', (c) => {
            let body = Buffer.concat(chunks).toString();
            console.log(body);
            return JSON.stringify(body);
        });
    });

    request.write(qs.stringify(maskReport));
    request.end()

    request.on('error', (e) => {
        console.log(e);
        return "Something Goes Wrong!"

    });
}


module.exports = {
    verifyReport,
    verifyAPI
}