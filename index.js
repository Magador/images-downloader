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
        if(Array.isArray(url)) {
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
    },
    remove: function(url) {
        if(Array.isArray(url)) {
            var removingUrls = url.filter(function(val) {
                return true;
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