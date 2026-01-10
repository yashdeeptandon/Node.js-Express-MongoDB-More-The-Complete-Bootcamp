const fs = require('fs');
const superagent = require('superagent');

const readFilePro = file => {
  return new Promise((res, rej) =>{
    fs.readFile(file, (err, data) =>{
      if(err) reject('File Not Found!');
      resolve(data);
    })
  })
}

const writeFilePro = file => {
  return new Promise((res, rej) =>{
    fs.writeFile(file, (err, data) =>{
      if(err) reject('Writing File Failed!');
      resolve('success');
    })
  })
}
