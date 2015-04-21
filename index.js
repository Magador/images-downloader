/**
 * Created by Magador on 21/04/2015.
 */

var requestPool = new (require('./request-pool'))(),
    util = require('util');


module.exports = function(links, selector, directory) {
    requestPool.add(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n']);
    console.log(requestPool.remove(['o', 'p', 'q']));
};

module.exports();