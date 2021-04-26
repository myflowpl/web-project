const { readFileSync, existsSync, writeFileSync } = require('fs');
const { execSync } = require('child_process');

if(process.argv[2] == '1') {
  console.log('Branch checkout: test if npm install required')
  let prevLockFile = '';
  const lockFile = readFileSync('package-lock.json', 'utf8');
  if(existsSync('.husky/_/package-lock.json')) {
    prevLockFile = readFileSync('.husky/_/package-lock.json', 'utf8')
  }
  if(prevLockFile !== lockFile) {
    console.log('lock file changed, RUNNING npm install !!!');
    execSync('npm install');
  }
  writeFileSync('.husky/_/package-lock.json', lockFile, {encoding: 'utf8'})
} else {
  console.log('File checkout: no npm install ')
}
