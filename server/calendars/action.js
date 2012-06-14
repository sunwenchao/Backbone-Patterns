module.exports = function(app) {

    var calService = require( './service.js' );

    // 获取所有数据
    app.get('/calendars', function(req, res) {

        // 判断请求类型
        if( req.xhr ){
            calService.getCals( function( err, replies ) {
                res.send( replies );
            });
        }else{
            res.sendfile( './public/html/home.html' );
        }
    });

    // 获取单条数据
    app.get('/calendars/:id', function(req, res, next) {
        if( req.xhr ){
            var reqId = req.params.id;

            calService.getCalById( reqId, function( err, replies ) {
                res.send( replies );
            });
        }else{
            next();
        }
    });

    // 添加单条数据
    app.post('/calendars', function(req, res) {

        var reqItem = req.body;

        reqItem.destjid = 'sunwenchao@gozap.com';
        reqItem.updatetime = new Date().getTime();

        calService.addCal( reqItem, function( err, replies ){
            res.send( replies );
        });
    });

    // 编辑单条数据
    app.put('/calendars/:id', function(req, res) {

        var reqId = req.params.id,
            reqItem = req.body;

        reqItem.updatetime = new Date().getTime();

        calService.editCal( reqId, reqItem, function( err, replies ){
            res.send( replies );
        });
    });

    // 删除单条数据
    app.del('/calendars/:id', function(req, res) {

        var reqId = req.params.id;

        calService.delCal( reqId, function( err, replies ){
            var hCode = err ? 500 : 200;
            res.send( replies, hCode );
        });
    });

    // 处理非xhr请求 统一至页面
    app.get( /\/calendars\/[\w]*/, function( req, res ) {
        if( !req.xhr ){
            res.sendfile( './public/html/home.html' );
        }
    });

    // 处理非xhr请求 统一至页面
    app.get( /\/contact[\w]*/, function( req, res ) {
        if( !req.xhr ){
            res.sendfile( './public/html/home.html' );
        }
    });
};