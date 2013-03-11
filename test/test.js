var pid = require('../lib/puid'),
  should = require('should');

var oldpid = pid.generate();

describe('lib/puid.js', function() {

  describe('getTimestamp', function() {
    it('should be a string with 8 chars', function() {
      pid.getTimestamp().should.be.a('string');
      pid.getTimestamp().should.have.length(8);
    });
    it('should be a sexhex value', function() {
      pid.getTimestamp().should.match(/[a-z0-9]/);
    });
    it('two request should not be equal', function() {
      pid.getTimestamp().should.not.eql(oldpid);
    });
  });

  describe('getMachineId', function() {
    it('should be a string with 6 chars', function() {
      pid.getMachineId().should.be.a('string');
      pid.getMachineId().should.have.length(6);
    });
    it('should be 089776', function() {
      pid.getMachineId(m0).should.be.eql('089776');
    });
    it('should be a093d8', function() {
      pid.getMachineId(m1).should.be.eql('a093d8');
    });
    it('should be dcfbe5', function() {
      pid.getMachineId(m2).should.be.eql('dcfbe5');
    });
    it('should be a sexhex value', function() {
      pid.getProcessId().should.match(/[a-z0-9]/);
    });
  });

  describe('getProcessId', function() {
    it('should be a string with 4 chars', function() {
      pid.getProcessId().should.be.a('string');
      pid.getProcessId().should.have.length(4);
    });
    it('should be a sexhex value', function() {
      pid.getProcessId().should.match(/[a-z0-9]/);
    });
    it('two request should be equal', function() {
      pid.getProcessId().should.equal(pid.getProcessId());
    });
  });

  describe('getCounter', function() {
    it('should be a string with 6 chars', function() {
      pid.getCounter().should.be.a('string');
      pid.getCounter().should.have.length(6);
    });
    it('should be a sexhex value', function() {
      pid.getCounter().should.match(/[a-z0-9]/);
    });
    it('two request should not be equal', function() {
      pid.getCounter().should.not.equal(pid.getCounter());
    });
  });

  describe('generate pId', function() {
    it('should be a string with 24 chars', function() {
      pid.generate().should.be.a('string');
      pid.generate().should.have.length(24);
    });
    it('should be a sexhex value', function() {
      pid.generate().should.match(/[a-z0-9]/);
    });
    it('two request should not be equal', function() {
      pid.generate().should.not.equal(pid.generate());
    });
  });

  describe('generate base36 string', function() {
    it('should be result in sexhex values', function() {
      pid.toBase36String('22').should.be.equal('0m');
      pid.toBase36String('22', 2).should.be.equal('0m');
      pid.toBase36String('22', 3).should.be.equal('00m');
      pid.toBase36String('22', 'foobar').should.be.equal('0m');
      pid.toBase36String('1000000', 5).should.be.equal('0lfls');
      pid.toBase36String('10000000000', 8).should.be.equal('04ldqpds');
      pid.toBase36String('10000000000', 9).should.be.equal('004ldqpds');
      pid.toBase36String('1000000', 4).should.be.equal('lfls');
    });
    it('should throw an error', function() {
      (function() {
        pid.toBase36String('foobar', 4);
      }).should.throwError(/foobar/);
    });
    it('should not throw an error, use default padding', function() {
      (function() {
        pid.toBase36String('1000','foobar');
      }).should.not.throwError();
    });
  });
})


var m0 = {
  lo0: [{
    address: 'fe80::1',
    family: 'IPv6',
    internal: true
  }, {
    address: '127.0.0.1',
    family: 'IPv4',
    internal: true
  }, {
    address: '::1',
    family: 'IPv6',
    internal: true
  }],
  en1: [{
    address: 'fe80::7bc3:8ac3:ea45:c34a',
    family: 'IPv6',
    internal: false
  }, {
    address: '192.168.3.22',
    family: 'IPv4',
    internal: false
  }],
  vnic0: [{
    address: '10.211.55.2',
    family: 'IPv4',
    internal: false
  }],
  vnic1: [{
    address: '10.37.129.2',
    family: 'IPv4',
    internal: false
  }]
}

var m1 = {
  Drahtlosnetzwerkverbindung:   [{
    address: 'fe80::f322:3e0f:ced6:5b83',
    family: 'IPv6',
    internal: false
  }, {
    address: '192.168.2.103',
    family: 'IPv4',
    internal: true
  }],
   
  'LAN-Verbindung':   [{
    address: 'fe80::93d3:34c9:7e0a:edc3',
    family: 'IPv6',
    internal: false
  }, {
    address: '192.168.2.10',
    family: 'IPv4',
    internal: true
  }],
   
  'VMware Network Adapter VMnet1':   [{
    address: 'fe80::1c3e:c641:340e:ea23',
    family: 'IPv6',
    internal: false
  }, {
    address: '169.254.6.66',
    family: 'IPv4',
    internal: true
  }],
   
  'VMware Network Adapter VMnet8':   [{
    address: 'fe80::6465:562d:2b25:34ef',
    family: 'IPv6',
    internal: false
  }, {
    address: '192.168.142.1',
    family: 'IPv4',
    internal: true
  }],
   
  'Loopback Pseudo-Interface 1':   [{
    address: '::1',
    family: 'IPv6',
    internal: true
  }, {
    address: '127.0.0.1',
    family: 'IPv4',
    internal: true
  }]
};

var m2 = {
  Ethernet:   [{
    address: 'fe80::cabf:e927:f866:8f3e',
    family: 'IPv6',
    internal: false
  }, {
    address: '10.16.16.22',
    family: 'IPv4',
    internal: false
  }],
  'Loopback Pseudo-Interface 1':   [{
    address: '::1',
    family: 'IPv6',
    internal: true
  }, {
    address: '127.0.0.1',
    family: 'IPv4',
    internal: true
  }],
  'LAN-Verbindung* 11':   [{
    address: '2001:3450:5af1:29fe:375a:fb8f:e54f:af39',
    family: 'IPv6',
    internal: false
  }, {
    address: 'fe80::8493:ab4f:e54f:cf39',
    family: 'IPv6',
    internal: false
  }]
}