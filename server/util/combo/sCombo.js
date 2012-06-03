var sCombo = (function( undefined ) {

    var fs = require('fs'),
        sInfo = require('../../../sInfo.js'),
        compressor = require('./node-minify.js');


    var SCombo = function( req, res ){
        this.qFiles = req.query.files;
        this.qType = req.query.type,

        this.desFiles = sInfo.basePath + '/public/' + this.qType + '/work/' + this.qFiles.replace( /\//g, '@' ),
        this.oriFiles = this.qFiles.split( ',' );

        this.res = res;
    };

    SCombo.prototype.go = function(){
        var res = this.res,
            oriFiles = this.oriFiles,
            desFiles = this.desFiles,
            qType = this.qType;

        fs.exists( desFiles, function( exists ){
            if( exists ){
                res.sendfile( desFiles );

            }else{
                for( var i = 0, len = oriFiles.length; i < len; i++ ){
                    oriFiles[ i ] = sInfo.basePath + '/public/' + qType + '/' + oriFiles[ i ];
                }

                fs.open( desFiles, "w", 0666, function( e, fd ){

                    new compressor.minify({
                        type: 'yui' + qType,
                        fileIn: oriFiles,
                        fileOut: desFiles,
                        callback: function(err){
                            res.sendfile( desFiles );
                        }
                    });
                });
            }
        });
    };

    return SCombo;

})();

exports.version = '0.0.1';
exports.sCombo = sCombo;