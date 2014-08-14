
var dvb = require('dvbjs');

module.exports = function(){

    module.index = function(req, res){
        res.render('api', {
          title: 'API Examples'
        });
    };

    module.monitor = function(req, res){
        var stop = req.params.stop;

        var numresults = 4;
        if (req.query.n) numresults = req.query.n;

        dvb.monitor(stop, 0, numresults, function(data){
            res.set('Content-Type', 'text/json');
            res.send(data);
        });
    };

    module.timeMonitor = function(req, res){
        var stop = req.params.stop;
        var timeoffset = req.params.timeoffset;

        var numresults = 4;
        if (req.query.n) numresults = req.query.n;

        dvb.monitor(stop, timeoffset, numresults, function(data){
            res.set('Content-Type', 'text/json');
            res.send(data);
        });
    };

    module.route = function(req, res){
        var origin = req.params.origin;
        var destination = req.params.destination;

        var time = new Date();
        var utc = time.getTime() + (time.getTimezoneOffset() * 60000);
        time = new Date(utc + (3600000 * 2));

        if (req.query.y) time.setYear(req.query.y);
        if (req.query.m) time.setMonth(req.query.m);
        if (req.query.d) time.setDate(req.query.d);
        if (req.query.h) time.setHours(req.query.h);
        if (req.query.i) time.setMinutes(req.query.i);

        var deparr = 0;
        if (req.params.deparr === 'arr') deparr = 1;

        dvb.route(origin, destination, time, deparr, function(data){
            res.set('Content-Type', 'text/json');
            res.send(data);
        });
    };

    module.find = function(req, res){
        var stop = req.params.stop;

        dvb.find(stop, function(data){
            res.set('Content-Type', 'text/json');
            res.send(data);
        });
    };

    return module;
};
