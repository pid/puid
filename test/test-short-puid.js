/* jshint -W030 */

var Puid = require('../lib/puid');

function getEpoch(years) {
    var now = new Date()
        .valueOf();

    now = now - 86400000 * 365 * years;

    var epoch = new Date(now);

    return epoch.getFullYear() + "-" + (epoch.getMonth() + 1) + "-" + epoch.getDate() + " " + epoch.getHours() + ":" + epoch.getMinutes() + ":" + epoch.getSeconds();
}

describe('test short puid', function() {

    it('with explicit nodeId as string', function() {

        var pid = new Puid('ab');

        pid.generate()
            .should.be.a.String;
        pid.generate()
            .should.have.length(14);
        pid.generate()
            .should.match(/ab$/);
        pid.generate()
            .should.match(/[a-z0-9]+/);
    });

    it('with explicit nodeId as uppercase string', function() {

        var pid = new Puid('AB');

        pid.generate()
            .should.be.a.String;
        pid.generate()
            .should.have.length(14);
        pid.generate()
            .should.match(/ab$/);
        pid.generate()
            .should.match(/[a-z0-9]+/);
    });

    it('with random nodeId', function() {

        var pid = new Puid('random');

        pid.generate()
            .should.be.a.String;
        pid.generate()
            .should.have.length(14);
        pid.generate()
            .should.match(/[a-z0-9]+/);

    });

    it('with empty nodeId string', function() {

        var pid = new Puid('');

        pid.generate()
            .should.be.a.String;
        pid.generate()
            .should.have.length(12);
        pid.generate()
            .should.match(/[a-z0-9]+/);

    });

    it('with config object set empty nodeId', function() {

        var pid = new Puid({
            nodeId: ''
        });

        pid.generate()
            .should.be.a.String;
        pid.generate()
            .should.have.length(12);
        pid.generate()
            .should.match(/[a-z0-9]+/);

    });

    it('with config object set nodeId', function() {

        var pid = new Puid({
            nodeId: "tt"
        });

        pid.generate()
            .should.be.a.String;
        pid.generate()
            .should.have.length(14);
        pid.generate()
            .should.match(/tt$/);
        pid.generate()
            .should.match(/[a-z0-9]+/);
    });

    it('with config object set epoch to 1 year ago', function() {

        var pid = new Puid({
            epoch: getEpoch(1)
        });

        pid.generate()
            .should.be.a.String;
        pid.generate()
            .should.have.length(14);
        pid.generate()
            .should.match(/^08miku/);
        pid.generate()
            .should.match(/[a-z0-9]+/);

    });

    it('with config object set epoch to 11 years ago', function() {

        var pid = new Puid({
            epoch: getEpoch(11)
        });

        pid.generate()
            .should.be.a.String;
        pid.generate()
            .should.have.length(14);
        pid.generate()
            .should.match(/^2mvod/);
        pid.generate()
            .should.match(/[a-z0-9]+/);

    });

    it('with config object set empty nodeId and epoch to 11 year ago', function() {

        var pid = new Puid({
            nodeId: '',
            epoch: getEpoch(11)
        });

        pid.generate()
            .should.be.a.String;
        pid.generate()
            .should.have.length(12);
        pid.generate()
            .should.match(/^2mvod/);
        pid.generate()
            .should.match(/[a-z0-9]+/);

    });

    it('with param "true"', function() {

        var pid = new Puid(true);

        pid.generate()
            .should.be.a.String;
        pid.generate()
            .should.have.length(12);
        pid.generate()
            .should.match(/[a-z0-9]+/);

    });

    it('with param "false"', function() {

        var pid = new Puid(false);

        pid.generate()
            .should.be.a.String;
        pid.generate()
            .should.have.length(14);
        pid.generate()
            .should.match(/[a-z0-9]+/);

    });

    it('should have specific default epoch value"', function() {

        var pid = new Puid(false);

        pid.config.epoch.should.equal("1999-06-07 03:00:00 pm GMT");
    });
});

//
