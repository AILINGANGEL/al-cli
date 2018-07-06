const fs = require('fs');
let getHomeDir = () => {
    return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

let fileExist = (file) => {
    return fs.existsSync(file)
}

let readFile = (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, { encoding: 'utf8' }, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    })
}

var getKey = (data, key) => {
    var value = '';
    for (var i = 0; i < data.length; i++) {
        let temp = data[i].split('=');
        if (temp[0].trim() === key) {
            // console.log(temp[0])
            value = temp[1].trim();
            break;
        }
    }
    return value;
}

var setKey = (file, key, value) => {
    return new Promise((resolve, reject) => {
        fs.appendFile(file, `\n${key}=${value}`, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve('success');
            }
        });
    });
}

let get = async function(file, k) {
    if (fileExist(file)) {
        let data = await readFile(file);
        data = data.split('\n');
        return getKey(data, k);
    } else {
        return '';
    }
}

let set = async function(file, k, v) {
    let result = await setKey(file, k, v);
    return result;
}

let remove = (file, k) => {
    return 'hold';
}

let getAll = () => {

}

const DEFAULT_CONFIG = {
    homeDir: getHomeDir(),
    file: '.alrc'
}

exports.DEFAULT_CONFIG = DEFAULT_CONFIG;
exports.get = get;
exports.set = set;