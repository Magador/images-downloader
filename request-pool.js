/**
 * Created by Magador on 18/04/2015.
 */

var downloader = require('downloader'),
    htmlparser = require('htmlparser2'),
    util = require('util');

var RequestPool = function(opts) {
    this.size = opts && opts.size && util.isNumber(opts.size)? opts.size: this.size;
    this.requests = opts && opts.requests && Array.isArray(opts.requests)? opts.requests: this.requests;
};

RequestPool.prototype.size = 5;
RequestPool.prototype.requests = [];
RequestPool.prototype.currents = [];

RequestPool.prototype.add = function(url) {
    if(Array.isArray(url)) {
        url.forEach(function (val) {
            this.add(val);
        }.bind(this));
    }
    if(typeof url === 'string') {
        this.requests.push({
            url: url,
            done: false
        });
    }
};
RequestPool.prototype.remove = function(url) {
    if(Array.isArray(url)) {
        var success = false;
        url.forEach(function(val) {
            success = this.remove(val) || success;
        }.bind(this));
        return success;
    }
    if(typeof url === 'string') {
        var index = this.contains(url);
        return this.requests.splice(index, index > 0 ? 1 : 0).length != 0;
    }
};
RequestPool.prototype.contains = function (url) {
    var i = this.requests.length;
    while(i--)
        if(this.requests[i].url === url)
            return i;
    return -1;
};
RequestPool.prototype.execute = function(callback) {

};

module.exports = RequestPool;