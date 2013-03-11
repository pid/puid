
var puid = require('../lib/puid');
// var puid = require('puid');

console.dir(puid);

for (var i = 0; i < 100; i++) {
    console.log(puid.generate());
}

console.dir(puid);
