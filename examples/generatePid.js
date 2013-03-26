
var Puid = require('../lib/puid'),
    puid = new Puid();

console.dir(puid);

for (var i = 0; i < 100; i++) {
    console.log(puid.generate());
}

console.dir(puid);
