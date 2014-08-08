/**
 * GET /api
 * API specs
 */

 exports.index = function(req, res) {
   res.render('api', {
     title: 'API Examples'
   });
 };
