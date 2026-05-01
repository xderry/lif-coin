#!/usr/bin/env node
'use strict'; /* eslint-env node */
const crypto = require('crypto');
const sha256 = require('./sha256.js');
const sha256lif = require('./sha256lif.js');

let buf = Buffer.alloc(80);
for (let i=0; i<80; i++)
  buf[i] = i;

function sha(method){
  switch (method){
  case 'crypto':
    let s = crypto.createHash('sha256');
    s.update(buf).digest();
    break;
  case 'js':
    sha256.digest(buf);
    break;
  case 'lif':
    sha256lif.digest(buf);
    break;
  }
}
let reps = +process.argv[2] || 1000000;
console.log('testing '+reps);
let start = Date.now();
for (let i=0; i<reps; i++){
  sha('lif');
}
let end = Date.now();
let ms = end-start;
console.log('finished '+ms+'ms. hash per sec: '+Math.round(reps/ms*1000));

