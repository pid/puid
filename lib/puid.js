var os = require('os');
var crypto = require('crypto');

var Puid = function Piud(options) {

    "use strict";

    this.config = {
        "nlen": options === void 0 ? 6 : 2, // machine identifier for long or short puid,
        "plen": 4, // process id
        "tlen": options === void 0 ? 8 : 12, // timestamp length for long or short puid
        "clen": 6, // counter/hrtime for long puid
        "epoch": "1999-06-07 03:00:00 pm GMT" // epoch start for short puid
    };

    if (options === void 0) {

        // long puid
        this.type = "long";

        this.nodeId = this.getNodeId();
        this.processId = this.getProcessId();

    } else {

        // short puid
        this.type = "short";

        if (typeof options === 'string' && options.length <= 2) {
            this.nodeId = options;
        } else {

            if (typeof options === 'object') {

                if (options.nodeId !== void 0 && typeof options.nodeId === 'string' && options.nodeId.length <= 2) {
                    this.nodeId = options.nodeId;
                }

                if (options.epoch !== void 0 && typeof options.epoch === 'string' && options.epoch.length >= 4) {
                    if (isNaN(Date.parse(options.epoch))) {
                        throw new Error("epoch date format error");
                    }
                    this.config.epoch = options.epoch;
                }
            }
        }

        // random nodeId
        if (options !== true && this.nodeId === void 0) {
            this.nodeId = this.toBase36String(parseInt(Math.random() * (Math.pow(36, 2) - 1), 10), this.config.nlen);
        } else {
            if (options === true) {
                this.nodeId = '';
            }
        }

        this.nodeId = this.nodeId && this.nodeId.toLowerCase()
            .trim();
    }
};

Puid.prototype.generate = function generate() {

    if (this.type[0] === "l") {
        return this.getTimestamp() + this.processId + this.nodeId + this.getCounter();
    } else {
        return this.getNanos() + this.nodeId;
    }

};

Puid.prototype.getTimestamp = function getTimestamp() {

    return this.toBase36String(Date.now(), this.config.tlen);
};

Puid.prototype.getNanos = function getNanos() {

    var hrt = '' + process.hrtime()[1];

    while (hrt.length < 9) {
        hrt = "0" + hrt;
    }

    var time = parseInt(Date.now() / 1000, 10) - parseInt(Date.parse(this.config.epoch) / 1000, 10);

    return this.toBase36String(time + '' + hrt, this.config.tlen);
};

Puid.prototype.getNodeId = function getNodeId(networkInterfaces, fallback) {

    var i, v, value;

    networkInterfaces = networkInterfaces || os.networkInterfaces() || {};

    if (!fallback) {
        /* jshint -W015: true */
        interfaces: for (i in networkInterfaces) {
            for (v in i) {
                if (networkInterfaces[i][v] && networkInterfaces[i][v].address.length && !networkInterfaces[i][v].internal) {
                    value = networkInterfaces[i][v].address;
                    break interfaces;
                }
            }
        }
    }

    return crypto.createHash('md5')
        .update(fallback || value || os.hostname(), 'utf8')
        .digest('hex')
        .slice(-this.config.nlen);
};

Puid.prototype.getProcessId = function getProcessId() {

    return this.toBase36String(process.pid, this.config.plen);
};

Puid.prototype.getCounter = function getCounter() {

    return this.toBase36String(process.hrtime()[1], this.config.clen);
};

Puid.prototype.toBase36String = function toBase36String(value, padding) {

    if (isNaN(value)) {
        throw new Error('error in toBase36String: value is NaN: \"' + value + '\"');
    }
    padding = padding && !isNaN(padding) ? padding : 2;

    var hex = Number(Math.abs(value))
        .toString(36);

    while (hex.length < padding) {
        hex = "0" + hex;
    }

    return hex.substr(0, padding);
};

module.exports = exports = Puid;

//
