const connection = require('./dbConnection')
const randomstring = require('randomstring')


function verifyDataType(data) {
    let result = false;
    if (typeof (data.user_id) === 'string' && typeof (data.market_id) === 'string' && typeof (data.cmdty_id) === 'string' && typeof (data.market_name) === 'string' && typeof (data.cmdty_name) === 'string' && typeof (data.market_type) === 'string' && typeof (data.price_unit) === 'string' && typeof (data.price) === 'number' && typeof (data.conv_factor) === 'number')
        result = true
    return result;
}


module.exports = {
    verifyDataType
}