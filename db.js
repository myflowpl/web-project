/* eslint-disable no-eval */
const {mkdir, cp} = require('shelljs');
const {existsSync} = require('fs');

if(!existsSync('./db.json')) {
  cp('./db-tpl.json', './db.json');
}
