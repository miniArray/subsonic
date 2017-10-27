subsonic
========

npm module for the subsonic api

[![build status](https://secure.travis-ci.org/switz/subsonic.png)](http://travis-ci.org/switz/subsonic)

### Install

```
$ npm install subsonic --save
```

### Example

```javascript
var Subsonic = require('subsonic')
var subsonic = new Subsonic({
  username: '',
  password: '',
  server: '',
  application: 'subsonic node.js api', // optional
  format: 'json', // optional
  version: 1.14 // optional
})

subsonic.artists().then(console.log)
```
