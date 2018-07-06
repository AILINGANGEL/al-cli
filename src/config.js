const fs = require('fs');
const ora = require('ora');
const path = require('path');
const config = require('./util/config');
const get = config.get;
const set = config.set;
const remove = config.remove;
const getAll = config.getAll;

const CONFIG = async function(action, key, value) {
    const configFilePath = config.DEFAULT_CONFIG.homeDir;
    const file = config.DEFAULT_CONFIG.file;
    var filePath = path.resolve(configFilePath, file);
    const spinner = ora('Loading unicorns').start();
    switch (action) {
        case 'get':
            var result = await get(filePath, key);
            spinner.succeed(result);
            break;
        case 'set':
            var result = await set(filePath, key, value);
            spinner.succeed(result);
            break;
        case 'remove':
            var result = remove(filePath, key);
            spinner.succeed();
            console.log(result);
            break;
        default:
            var result = getAll(filePath, key);
    }
}

module.exports = CONFIG;