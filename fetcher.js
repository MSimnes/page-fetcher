const argv = process.argv.slice(2);
const request = require('request');
const fs = require('fs');

// function to fetch a response body from the requested URL and use a callback function to write the file to a local 

const fetch = function(URL, localFile) {
  request(URL, (error, response, body) => {
    if (error) {
      console.log(`Error retrieving request from ${URL}. ERROR: `, error);
    } else {
      console.log('statusCode', response && response.statusCode);
      console.log('body', body);
      const capturedBody = body;
      writeToLocal(localFile, capturedBody);
    }
  });
};
const writeToLocal = function(localPath, capturedBody) {
  fs.writeFile(localPath, capturedBody, (error) => {
    if (error) {
      console.log(`Error writing file to ${argv[1]}, ERROR: `, error);
      return;
    } else {
      const bytes = capturedBody.length;
      console.log(`Downloaded and saved ${bytes} bytes to ${localPath}`);
    }
  });
};

fetch(argv[0], argv[1]);