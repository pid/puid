[![Build Status](https://travis-ci.org/pid/puid.png)](https://travis-ci.org/pid/puid)[![NPM version](https://badge.fury.io/js/puid.png)](http://badge.fury.io/js/puid)

puid - primary unique id
========================

Generate an unique ID depending on time, machine and process for use in a distributed environment.

puid - 24 characters uid
------------------------

Each unique ID has 4 sections and has 24 chars, which are:

i.e. he5fps6l2504cd1w3ag8ut8e // he5fps6l-2504cd-1w3a-g8ut8e

-	timestamp: 'he5fps6l' // (8) Timestamp in microseconds - safe until 2059
-	machineId: '2504cd' // (6) First 6 chars from md5 of first external network interface or fallback to hostname
-	processId: '1w3a' // (4) pid
-	counter: 'g8ut8e' // (6) High-resolution real time; nanoseconds

All values (except machineID) are converted to base36.

Why is the counter not really a counter? Because of collision, it's more likely that the same machine and process use (accidently!) two puid-objects (async) and generate an Id at the same microsecond with identical counter. That the same process will execute the counter function within the same nanosecond should be impossible (imo) - feedback is welcome.

puid - short puid - 12-14 characters uid
----------------------------------------

Each unique ID has 2 sections and has 12 chars without nodeId or 14 chars with nodeId, which are:

```
i.e. with 14-chars: aeby6ob5sso4zd  // aeby6ob5sso4-zd

- timestamp:    'aeby6ob5sso4'      // (12) Timestamp in seconds + hrtime counter
- nodeId:       'zd'                   // (2) nodeId
```

After the first puid release, I was testing for some shorter UIDs. In result, the short-puid was born ;-). Works only with node.js (depends on process.hrtime). The process.hrtime[1] gives you a counter (milliseconds+nanoseconds value from 1 to 1_000_000_000) not depending of the current timestamp; in result you can use short-puid (12 chars version) without any conflicts with multi-instances of puid in the same process or in different processes on the same host (tested with 20 parallel instances generating 4 billion puids). With multi nodes/hosts, you have to use the short-version with 14 chars which includes a nodeId.

### Configure short-puid

You have options :-) You can pass the epoch to start counting the timestamp, per default we start at "1999-06-07 03:00:00 pm GMT", and you can pass the nodeId. Take a look to the usage section for all possiblities.

Usecase
-------

Generate unique keys for e.g. Redis.

Installation
------------

[![NPM version](https://badge.fury.io/js/puid.png)](http://badge.fury.io/js/puid)

```bash
$ npm install puid
```

Running tests
-------------

[![Build Status](https://travis-ci.org/pid/puid.png)](https://travis-ci.org/pid/puid)

```bash
$ npm test
```

Usage
-----

```js

var Puid = require('puid');
var puid;

// generate puid (long-version 24-chars)

puid = new Puid();
console.log(puid.generate());   // hgqy29gr11cm2504cdf8rg7q


// generate puid (short-version 12-chars) without nodeId / **Shortcut**

puid = new Puid(true);
console.log(puid.generate());  // 3bqk9my968mc


// generate puid (short-version 14-chars) random nodeId / **Shortcut**

puid = new Puid(false);
console.log(puid.generate());  // 3bqk9my9buecut


// generate puid (short-version 14-chars) with nodeId string

puid = new Puid('JS');
console.log(puid.generate());   // 3bq1plt0vlycjs // 3bq1plt0vlyc->(js)


// generate puid (short-version 12-chars) with empty nodeId string

puid = new Puid('');
console.log(puid.generate());   // 3bq1plt1iiw4


// generate puid (short-version 14-chars) with nodeId in config object

puid = new Puid({
    nodeId: 'JS'
});
console.log(puid.generate());   // 3bq1plt1ljwgjs // 3bq1plt1ljwg->(js)


// generate puid (short-version 14-chars) with epoch in config object and random nodeId

puid = new Puid({
    epoch: '1980-01-01'
});
console.log(puid.generate());   // 801eeqggvq0w54


// generate puid (short-version 14-chars) with epoch and nodeId in config object

puid = new Puid({
    epoch: '1980-01-01',
    nodeId: 'JS'
});
console.log(puid.generate());   // 801eeqggyo00js // 801eeqggyo00->(js)


// generate puid (short-version 12-chars) with epoch and empty nodeId in config object

puid = new Puid({
    epoch: '2013-01-01',
    nodeId: ''
});
console.log(puid.generate());   // 036pqlnkkjk0


```

[Changelog](https://raw.github.com/pid/puid/master/Changelog)
-------------------------------------------------------------

License
-------

[MIT](https://raw.github.com/pid/puid/master/LICENSE)

Copyright (c) 2013-2015 Sascha Droste pid@posteo.net

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/pid/puid/trend.png)](https://bitdeli.com/free)
