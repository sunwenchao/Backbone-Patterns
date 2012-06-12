module.exports = function(app) {

    var SCombo = require( '../util/combo/sCombo.js' ).sCombo;

    app.get(['/','/index'], function(req, res) {
//        res.render( 'test', { pageTitle:'fuck', youAreUsingJade:true } );
//        res.redirect( '/calendars' );
        res.sendfile( './public/html/home.html' ); // forward
    });

    app.get('/download', function(req, res) {
        res.sendfile( './public/html/download.html' );
    });

    require( '../calendars/action.js' )( app );

    // 处理需要合并压缩的静态资源请求
    app.get('/combo', function( req, res ) {
        new SCombo( req, res ).go();
    });

    app.get( '/*', function( req, res ){
        res.render( '404', {
            status : 404,
            title : '404 - 文件未找到'
        });
    });
};