/**
 * Created by Magador on 18/04/2015.
 */

var request = require('request'),
    util = require('util');

var RequestPool = function(opts) {
    this.size = opts && opts.size && util.isNumber(opts.size)? opts.size: this.size;
    if(opts && opts.requests && Array.isArray(opts.requests)) {
        this.add(opts.requests);
    }
};

RequestPool.prototype.size = 5;
RequestPool.prototype.retries = 5;
RequestPool.prototype.requests = [];
RequestPool.prototype.currents = [];

RequestPool.prototype.add = function(url) {
    if(Array.isArray(url)) {
        url.forEach(function (val) {
            this.add(val);
        }.bind(this));
		return;
    }
    if(typeof url === 'string') {
        this.requests.push({
            url: url,
            done: false,
            retries: 0
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
	this._next.index = -1;
};
RequestPool.prototype.contains = function (url) {
    var i = this.requests.length;
    while(i--)
        if(this.requests[i].url === url)
            return i;
    return -1;
};
RequestPool.prototype.getDoneStatus = function(i) {
    return this.requests[i].done;
};
RequestPool.prototype.getAllDoneStatus = function() {
    var status = [];
    for(var i = 0; i < this.requests.length; i++)
        status.push(this.requests[i].done);
    return status;
};
RequestPool.prototype.getGlobalDoneStatus = function() {
    return !this.requests.some(function(val) {
        return !val;
    })
};
RequestPool.prototype.play = function(each, end) {
	var executeNext = function(err, resp, body) {
		this._execute(this._next(), executeNext.bind(this));
		if(each) each(err, resp, body);
	};
	
    for(var i = 0; i < this.size; i++) {
        this._execute(this._next(), executeNext.bind(this));
    }

	this._next.index = -1;
	
    if(end) end(err, res, body);
};
RequestPool.prototype.pause = function() {
    this.currents.forEach(function(req) {
        req.pause();
    })
};
RequestPool.prototype.resume = function () {
    this.currents.forEach(function(req) {
        req.resume();
    })
};


RequestPool.prototype._next = function() {
	if(this.requests[++this._next.index])
		return this.getDoneStatus(this._next.index)? this._next(): this.requests[this._next.index];
    else {
        this._next.index = -1;
        return this.getGlobalDoneStatus()? undefined: this._next();
    }
};
RequestPool.prototype._next.index = -1;
RequestPool.prototype._execute = function(req, callback) {
	if(req) {
		return request(req.url, function(err, resp, body) {
			if(err) {
                console.log(err);
                if(++req.retries === this.retries) {
                    req.done = true;
                }
            } else {
                req.done = true;
            }
			if(callback) callback(err, resp, body);
        }.bind(this));
	}
};

module.exports = RequestPool;
