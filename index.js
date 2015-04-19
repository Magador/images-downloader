/**
 * Created by Magador on 18/04/2015.
 */

var downloader = require('downloader'),
    htmlparser = require('htmlparser2');

var requestPool = {
    requests: [],
    currents: [],
    size: 5,
    add: function(url) {
        if(url instanceof Array) {
            url.forEach(function (val) {
                requestPool.add(val);
            });
        }
        if(typeof url === 'string') {
            requestPool.requests.push({
                url: url,
                done: false
            });
        }
    }

};

module.exports = function(links, selector, directory) {

};