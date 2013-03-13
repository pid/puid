[![Build Status](https://travis-ci.org/pid/puid.png)](https://travis-ci.org/pid/puid)

# puid - primary unique id
Generate an unique ID depends on time, machine and process for use in distributed environment.

Each unique ID has 4 sections which are:

  i.e. he5fps6l2504cd1w3ag8ut8e // he5fps6l-2504cd-1w3a-g8ut8e

  - timestamp:    'he5fps6l'  // Timestamp in microseconds
  - machineId:    '2504cd'    // the first external device, md5 to the address (IPv4/IPv6)
  - processId:    '1w3a'      // pid
  - counter:      'g8ut8e'    // high-resolution real time; nanoseconds

All values are converted to base36.

## Installation

```bash
$ npm install puid
```

## Running unit tests

[![Build Status](https://travis-ci.org/pid/puid.png)](https://travis-ci.org/pid/puid)

```
$ npm test
```

## Usage

```js
    var puid = require('puid');
    console.log(puid.generate());
    console.log(puid.generate());

    // Output:
    // he5gawzw2504cd1w6x83z1kr
    // he5gawzw2504cd1w6x83ziw1
```

## License
[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2013 Sascha Droste &lt;sascha.droste AT gmail DOT com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.