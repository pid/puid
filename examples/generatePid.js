var Puid = require('../lib/puid');

var puid;

// ####

console.log("\ngenerate puid (long-version)\n");

puid = new Puid();

for (var i = 0; i < 3; i++) {
    console.log(puid.generate());
}

// ####

console.log("\ngenerate puid (short-version) with nodeId string\n");

puid = new Puid('JS');

for (var i = 0; i < 3; i++) {
    console.log(puid.generate());
}

// ####

console.log("\ngenerate puid (short-version) with empty nodeId string\n");

puid = new Puid('');

for (var i = 0; i < 3; i++) {
    console.log(puid.generate());
}

// ####

console.log("\ngenerate puid (short-version) with nodeId in config object \n");

puid = new Puid({
    nodeId: 'JS'
});

for (var i = 0; i < 3; i++) {
    console.log(puid.generate());
}

// ####

console.log("\ngenerate puid (short-version) with epoch in config object and random nodeId\n");

puid = new Puid({
    epoch: '1980-01-01'
});

for (var i = 0; i < 3; i++) {
    console.log(puid.generate());
}

// ####

console.log("\ngenerate puid (short-version) with epoch and nodeId in config object\n");

puid = new Puid({
    epoch: '1980-01-01',
    nodeId: 'JS'
});

for (var i = 0; i < 3; i++) {
    console.log(puid.generate());
}

// ####

console.log("\ngenerate puid (short-version) with epoch and empty nodeId in config object\n");

puid = new Puid({
    epoch: '2013-01-01',
    nodeId: ''
});

for (var i = 0; i < 3; i++) {
    console.log(puid.generate());
}

// ####

console.log("\ngenerate puid (short-version 12-chars) without nodeId / Shortcut new Puid(true)!\n");

puid = new Puid(true);

for (var i = 0; i < 3; i++) {
    console.log(puid.generate());
}

// ####

console.log("\ngenerate puid (short-version 14-chars) random nodeId / Shortcut new Puid(false)!\n");

puid = new Puid(false);

for (var i = 0; i < 3; i++) {
    console.log(puid.generate());
}

//