const randomstring = require('randomstring')


function generateID() {
    return randomstring.generate({
        length: 12,
        charset: 'alphanumeric',
        capitalization: 'lowercase'
    });
}

module.exports = {
    generateID
}