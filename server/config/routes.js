module.exports = function(app) {

    var SCombo = require( '../util/combo/sCombo.js' ).sCombo;

    app.get(['/','/index'], function(req, res) {
//        res.render( 'test', { pageTitle:'fuck', youAreUsingJade:true } );
        res.sendfile( './public/html/home.html' );
    });

    require( '../calendars/action.js' )( app );

    // 处理需要合并压缩的静态资源请求
    app.get('/combo', function( req, res ) {
        new SCombo( req, res ).go();
    });

};