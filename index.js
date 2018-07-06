#!/usr/bin/env node

var program = require('commander');
var pack = require('./package.json');
var config = require('./src/config');
var install = require('./src/install');

const ACTION_MAP = [{
    name: 'config',
    alias: 'c',
    description: 'config the cofiguration file',
    action(action, key, value) {
        config(action, key, value);
    }
}, {
    name: 'install',
    alias: 'i',
    description: 'install ailing\'s template',
    action() {
        install()
    }
}];

program.version(pack.version, '-v, --version')
ACTION_MAP.forEach((action) => {
    program.command(action.name).alias(action.alias).action(action.action);
})
program.parse(process.argv);