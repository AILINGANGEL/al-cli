const request = require('request');
const prompt = require('prompt');
const GIT_INFO = require('./util/const');

const GET_TEMPLATE = async function() {
    var url = `https://api.github.com/${GIT_INFO.type}/${GIT_INFO.orgName}/repos`;
    let templates = await new Promise((resolve, reject) => {
        request({
            method: 'GET',
            uri: url,
            headers: {
                'User-Agent': 'Request-Promise'
            },
            resolveWithFullResponse: true
        }, function(error, response, body) {
            if (error || response.statusCode !== 200) {
                reject(error || 'error');
            } else {
                var data = JSON.parse(body).map((data) => data.name);
                resolve(data);
            }
        })
    });
    return templates;
}

const GET_TAGS = async function(template) {
    var url = `https://api.github.com/repos/${GIT_INFO.orgName}/${template}/tags`;
    console.log(url);
    let tags = await new Promise((resolve, reject) => {
        request({
            method: 'GET',
            uri: url,
            headers: {
                'User-Agent': 'Request-Promise'
            },
            resolveWithFullResponse: true
        }, function(error, response, body) {
            if (error || response.statusCode !== 200) {
                reject(error || 'error');
            } else {
                var data = JSON.parse(body).map((data) => data.name);
                resolve(data);
            }
        })
    });
    return tags;
}

const DOWNLOAD_REPO = async function() {

}

const INSTALL = async function() {
    let templates = await GET_TEMPLATE();
    let template = '';
    let version = '';
    console.log(templates);
    prompt.start();
    prompt.get(['template'], function(err, result) {
        template = result.template;
        console.log(template);
        let tags = await GET_TAGS(template);
        console.log(tags);
        prompt.get(['version'], function(err, result) {
            version = result.version;
            console.log(version);
        });
    });




}

module.exports = INSTALL;