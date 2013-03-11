var os = require('os'),
	crypto = require('crypto'),
	// char lengths for the parts
	tlen = 8, // timestamp length, due to 5/25/2059
	mlen = 6, // machine identifier,
	plen = 4, // process id
	clen = 6; // counter/hrtime

var Puid = function Piud() {
	'use strict';

	this.machineId = this.getMachineId();
	this.processId = this.getProcessId();
};

Puid.prototype.generate = function generate() {
	'use strict';

	this.timestamp = this.getTimestamp();
	this.counter = this.getCounter();

	//return this.timestamp + '-' + this.machineId + '-' + this.processId + '-' + this.counter;
	return this.timestamp + this.machineId + this.processId + this.counter;
};

Puid.prototype.getTimestamp = function getTimestamp() {
	'use strict';

	return this.toBase36String(Date.now(), tlen);
};

Puid.prototype.getMachineId = function getMachineId(networkInterfaces) {
	'use strict';

	var interfaces, i, v;
	interfaces = networkInterfaces || os.networkInterfaces();

	for (i in interfaces) {
		for (v in i) {
			if (interfaces[i][v] && !interfaces[i][v].internal) {
				if (interfaces[i][v].address.length) {
					return crypto.createHash('md5').update(interfaces[i][v].address, 'utf8').digest('hex').slice(-mlen);
				}
			}
		}
	}
	// fallback
	return this.toBase36String(process.hrtime()[1], clen).slice(-mlen);
};

Puid.prototype.getProcessId = function getProcessId() {
	'use strict';

	return this.toBase36String(((typeof process === 'undefined' && typeof process.pid === 'undefined') ? Math.random() * 99999 : process.pid), plen);
};

Puid.prototype.getCounter = function getCounter() {
	'use strict';

	return this.toBase36String(((typeof process === 'undefined' || typeof process.hrtime === 'undefined') ? Math.random() * 99999999 : process.hrtime()[1]), clen);
};

Puid.prototype.toBase36String = function toBase36String(value, padding) {
	'use strict';

	if (isNaN(value)) {
		throw new Error('error in toBase36String: convert base36 with value \"' + value + '\"');
	}
	padding = padding && !isNaN(padding) ? padding : 2;

	var hex = Number(Math.abs(value)).toString(36);

	while (hex.length < padding) {
		hex = "0" + hex;
	}

	if (hex && (hex.length === padding)) {
		return hex;
	} else {
		throw new Error('error in toBase36String: convert base36 with value \"' + value + '\"');
	}
};

module.exports = exports = new Puid();

//