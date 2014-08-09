
var dvb = require('dvbjs');

module.exports = function(){

    module.index = function(req, res){
        res.render('api', {
          title: 'API Examples'
        });
    };

    module.monitor = function(req, res){
        var stop = req.params.stop;

        var timeoffset = 0;
        if (req.query.t) timeoffset = req.query.t;

        dvb.monitor(stop, timeoffset, 1, function(data){
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

        var deparr = 0;
        if (req.params.deparr === 'arr') deparr = 1;

        dvb.route(origin, destination, time, deparr, function(data){
             res.set('Content-Type', 'text/json');
             res.send(data);
        });
    };

    module.fullRoute = function(req, res){
        var time = new Date(req.params.year, req.params.month, req.params.day, req.params.hour, req.params.minute);
        var origin = req.params.origin;
        var destination = req.params.destination;

        var deparr = 0;
        if (req.params.deparr === 'arr') deparr = 1;

        dvb.route(origin, destination, time, deparr, function(data){
            res.set('Content-Type', 'text/json');
            res.send(data);
        });
    };

    module.timeRoute = function(req, res){
        var time = new Date();
        time.setHours(req.params.hour);
        time.setMinutes(req.params.minute);
        var origin = req.params.origin;
        var destination = req.params.destination;

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
