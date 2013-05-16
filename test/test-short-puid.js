var Puid = require('../lib/puid'),
    should = require('should');

function getEpoch(years) {
    var now = new Date()
        .valueOf();
    now = now - 86400000 * 365 * years;

    var epoch = new Date(now);

    return epoch.getFullYear() + "-" + (epoch.getMonth() + 1) + "-" + epoch.getDate() + " " + epoch.getHours() + ":" + epoch.getMinutes() + ":" + epoch.getSeconds();
}

describe('test short puid', function () {

    it('with explicit nodeId as string', function () {
        var pid = new Puid('ab');

        pid.generate()
            .should.be.a('string');
        pid.generate()
            .should.have.length(14);
        pid.generate()
            .should.match(/ab$/);
        pid.generate()
            .should.match(/[a-z0-9]+/)
    });

    it('with explicit nodeId as uppercase string', function () {
        var pid = new Puid('AB');

        pid.generate()
            .should.be.a('string');
        pid.generate()
            .should.have.length(14);
        pid.generate()
            .should.match(/ab$/);
        pid.generate()
            .should.match(/[a-z0-9]+/)
    });

    it('with random nodeId', function () {
        var pid = new Puid('random');

        pid.generate()
            .should.be.a('string');
        pid.generate()
            .should.have.length(14);
        pid.generate()
            .should.match(/[a-z0-9]+/)

    });

    it('with empty nodeId string', function () {
        var pid = new Puid('');

        pid.generate()
            .should.be.a('string');
        pid.generate()
            .should.have.length(12);
        pid.generate()
            .should.match(/[a-z0-9]+/)

    });

    it('with config object set empty nodeId', function () {
        var pid = new Puid({
            nodeId: ''
        });

        pid.generate()
            .should.be.a('string');
        pid.generate()
            .should.have.length(12);
        pid.generate()
            .should.match(/[a-z0-9]+/)

    });

    it('with config object set nodeId', function () {
        var pid = new Puid({
            nodeId: "tt"
        });

        pid.generate()
            .should.be.a('string');
        pid.generate()
            .should.have.length(14);
        pid.generate()
            .should.match(/tt$/);
        pid.generate()
            .should.match(/[a-z0-9]+/)
    });

    it('with config object set epoch to YYYY (32 years ago)', function () {
        var pid = new Puid({
            "epoch": getEpoch(32)
                .substring(0, 4)
        });

        pid.generate()
            .should.be.a('string');
        pid.generate()
            .should.have.length(14);
        pid.generate()
            .should.match(/^7re/);
        pid.generate()
            .should.match(/[a-z0-9]+/)

    });

    it('with config object set nodeId and epoch to YYYY', function () {
        var pid = new Puid({
            "nodeId": "qq",
            "epoch": getEpoch(32)
                .substring(0, 4)
        });

        pid.generate()
            .should.be.a('string');
        pid.generate()
            .should.have.length(14);
        pid.generate()
            .should.match(/qq$/);
        pid.generate()
            .should.match(/^7re/);
        pid.generate()
            .should.match(/[a-z0-9]+/)
    });

    it('with config object set epoch to YYYY (11 years ago)', function () {
        var pid = new Puid({
            epoch: getEpoch(11)
                .substring(0, 4)
        });

        pid.generate()
            .should.be.a('string');
        pid.generate()
            .should.have.length(14);
        pid.generate()
            .should.match(/^2q5/);
        pid.generate()
            .should.match(/[a-z0-9]+/)

    });

    it('with config object set epoch to YYYY-MM-DD HH:MM:SS', function () {
        var pid = new Puid({
            epoch: getEpoch(11)
                .substring(0, 19)
        });

        pid.generate()
            .should.be.a('string');
        pid.generate()
            .should.have.length(14);
        pid.generate()
            .should.match(/^2mvoda/);
        pid.generate()
            .should.match(/[a-z0-9]+/)

    });

    it('with config object set epoch to 1 year ago', function () {
        var pid = new Puid({
            epoch: getEpoch(1)
        });

        pid.generate()
        pid.generate()
            .should.be.a('string');
        pid.generate()
            .should.have.length(14);
        pid.generate()
            .should.match(/^08miku/);
        pid.generate()
            .should.match(/[a-z0-9]+/)

    });

    it('with config object set epoch to 11 years ago', function () {
        var pid = new Puid({
            epoch: getEpoch(11)
        });

        pid.generate()
        pid.generate()
            .should.be.a('string');
        pid.generate()
            .should.have.length(14);
        pid.generate()
            .should.match(/^2mvod/);
        pid.generate()
            .should.match(/[a-z0-9]+/)

    });

    it('with config object set empty nodeId and epoch to 11 year ago', function () {
        var pid = new Puid({
            nodeId: '',
            epoch: getEpoch(11)
        });

        pid.generate()
            .should.be.a('string');
        pid.generate()
            .should.have.length(12);
        pid.generate()
            .should.match(/^2mvod/);
        pid.generate()
            .should.match(/[a-z0-9]+/)

    });

    it('with param "true"', function () {
        var pid = new Puid(true);

        pid.generate()
            .should.be.a('string');
        pid.generate()
            .should.have.length(12);
        pid.generate()
            .should.match(/[a-z0-9]+/)
    });

    it('with param "false"', function () {
        var pid = new Puid(false);

        pid.generate()
            .should.be.a('string');
        pid.generate()
            .should.have.length(14);
        pid.generate()
            .should.match(/[a-z0-9]+/)
    });
});

//