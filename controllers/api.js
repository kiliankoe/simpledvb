
var dvb = require('dvbjs');

module.exports = function(){

    module.index = function(req, res){
        res.render('api', {
          title: 'API Examples'
        });
    };

    module.monitor = function(req, res){
        var stop = req.params.stop;

        dvb.monitor(stop, 0, 1, function(data){
            res.set('Content-Type', 'text/json');
            res.send(data);
        });
    };

    module.monitorNum = function(req, res){
        var stop = req.params.stop;
        var numresults = req.params.numresults;

        dvb.monitor(stop, 0, numresults, function(data){
            res.set('Content-Type', 'text/json');
            res.send(data);
        });
    };

    module.route = function(req, res){
        var origin = req.params.origin;
        var destination = req.params.destination;
        var time = new Date();

        dvb.route(origin, destination, time, 0, function(data){
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
