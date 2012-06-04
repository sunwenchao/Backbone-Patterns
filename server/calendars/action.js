module.exports = function(app) {

    var calService = require( './service.js' );

    app.get('/calendars', function(req, res) {

        calService.getCals( function( err, replies ){
            res.send( replies );
        });
    });

    app.post('/calendars', function(req, res) {

        var testObj = {
            title : '我是个测试标题' + Date.now(),
            content : '我是个测试内容我是个测试内容我是个测试内容我是个测试内容我是个测试内容我是个测试内容' +
                '我是个测试内容我是个测试内容我是个测试内容我是个测试内容我是个测试内容我是个测试内容',
            destjid : 'sunwenchao@gozap.com'
        };

        calService.addCal( testObj, function( err, replies ){
            res.send( replies );
        });
    });

    app.del('/calendars/:id', function(req, res) {

        var reqId = req.params.id;

        calService.delCal( reqId, function( err, replies ){
            res.send( replies, 200 );
        });
    });




};