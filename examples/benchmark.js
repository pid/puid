
var Puid = require('../lib/puid'),
    puid = new Puid();
// var puid = require('puid');

var repetitions = 2000000;

console.time('generated '+ repetitions + ' PUIDs');

for (var i = 0; i < repetitions; i++) {
    puid.generate();
}

console.timeEnd('generated '+ repetitions + ' PUIDs');
