console.log('running node setup...');

var PouchRemoteStream = require('../');
var remote = PouchRemoteStream();
global.PouchDB = require('pouchdb').defaults({
  adapter: 'remote',
  remote: remote
});

global.PouchDB.adapter('remote', PouchRemoteStream.adapter);
global.PouchDB.preferredAdapters = ['remote'];

global.testUtils = require('../node_modules/pouchdb/tests/integration/utils');
global.should = require('chai').should();

var net = require('net');
var stream = net.connect(3004);
stream.pipe(remote).pipe(stream);

console.log('node setup ran');