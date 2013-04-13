'use strict';

var os = require('os'),
  crypto = require('crypto'),
  // char lengths for the parts
  tlen = 8, // timestamp length, due to 5/25/2059
  mlen = 6, // machine identifier,
  plen = 4, // process id
  clen = 6; // counter/hrtime

var Puid = function Piud() {
  this.machineId = this.getMachineId();
  this.processId = this.getProcessId();
};

Puid.prototype.generate = function generate() {
  this.timestamp = this.getTimestamp();
  this.counter = this.getCounter();

  return this.timestamp + this.machineId + this.processId + this.counter;
};

Puid.prototype.getTimestamp = function getTimestamp() {
  return this.toBase36String(Date.now(), tlen);
};

Puid.prototype.getMachineId = function getMachineId(networkInterfaces, fallback) {
  var i, v;

  networkInterfaces = networkInterfaces || os.networkInterfaces() || {};

  for (i in networkInterfaces) {
    for (v in i) {
      if (networkInterfaces[i][v] && networkInterfaces[i][v].address.length && !networkInterfaces[i][v].internal) {
        return crypto.createHash('md5').update(networkInterfaces[i][v].address, 'utf8').digest('hex').slice(-mlen);
      }
    }
  }

  // fallback
  fallback = fallback || os.hostname();
  return crypto.createHash('md5').update(fallback, 'utf8').digest('hex').slice(-mlen);
};

Puid.prototype.getProcessId = function getProcessId() {
  return this.toBase36String(process.pid, plen);
};

Puid.prototype.getCounter = function getCounter() {
  return this.toBase36String(process.hrtime()[1], clen);
};

Puid.prototype.toBase36String = function toBase36String(value, padding) {
  if (isNaN(value)) {
    throw new Error('error in toBase36String: value is NaN: \"' + value + '\"');
  }
  padding = padding && !isNaN(padding) ? padding : 2;

  var hex = Number(Math.abs(value)).toString(36);

  while (hex.length < padding) {
    hex = "0" + hex;
  }

  if (hex && (hex.length === padding)) {
    return hex;
  } else {
    throw new Error('error2 in toBase36String: convert base36 with value \"' + value + '\"');
  }
};

module.exports = exports = Puid;

//