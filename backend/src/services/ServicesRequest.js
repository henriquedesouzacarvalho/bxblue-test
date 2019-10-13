const request = require("request");

async function performGet(url) {
    return new Promise((resolve, reject) => {
        request({url, method: "GET"}, (error, response, body) => {
            if (error) {
                return reject(error);
            }
            return resolve({body});
        });
    });
}

module.exports = {
    performGet
}