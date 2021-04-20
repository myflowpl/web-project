/* eslint-disable no-eval */
const {existsSync, copyFileSync} = require('fs');

if(!existsSync('./api/db.json')) {
  copyFileSync('./api/db-tpl.json', './api/db.json');
  console.log('db data was initialized :)');
} else {
  console.log('db data already present :)')
}
