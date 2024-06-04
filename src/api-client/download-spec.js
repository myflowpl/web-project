const { readFileSync, writeFileSync, createWriteStream } = require('fs');
const { resolve } = require('path');
var http = require('https');
// var http = require('http');

const specUrl = 'https://petstore.swagger.io/v2/swagger.json';

const specFile = resolve(__dirname, 'openapi.json');

download(specUrl, specFile)
.then(data => {

  // jeśli jest potrzeba, tu możesz zmodyfikować wygenerowany spec
  
  // EXAMPLE:
//   data.paths["/agreement/pdf"].get.responses[200].content["application/pdf"].schema.format = 'binary';

  //
  
  const str = JSON.stringify(data, null, 2);
  writeFileSync(specFile, str);
  console.log('DOWNLOAD COMPLETED :)')
  console.log('FROM:', specUrl)
  console.log('TO:', specFile)
})
.catch(err => console.log('DOWNLOAD ERROR', specFile, err))


// HELPERS


function download(url, dest) {
  return new Promise((resolve, reject) => {

    var file = createWriteStream(dest);
    http.get(url, function(response) {
      response.pipe(file);
      file.on('finish', function() {
        file.close(() => {
          const spec = readFileSync(specFile);
          const data = JSON.parse(spec);
          resolve(data);
        });  // close() is async, call cb after close completes.
      });
      file.on('error', function(err) {
        console.log('err', err)
        reject(err);
        file.close((data) => {
          console.log('err2', data)
          reject(err);
        });  // close() is async, call cb after close completes.
      });
    });

  });
}