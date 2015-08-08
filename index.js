/**
 * Created by Magador on 21/04/2015.
 */

var requestPool = new (require('./request-pool.js'))(),
    util = require('util');


module.exports = function(links, directory) {
    requestPool.add(links);
	requestPool.play(function(err, resp, body) {
		console.log('done');
	});
};