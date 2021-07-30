const randomstring = require('randomstring');


function generateID() {
    return randomstring.generate({
        length: 12,
        charset: 'alphanumeric',
        capitalization: 'lowercase'
    });
}

function genAlphaString() {
    return randomstring.generate({
        length: 6,
        charset: 'alphabetic',
        capitalization: 'lowercase'
    });
}


module.exports = {
    generateID,
    genAlphaString
}