var sCombo = (function( undefined ) {

    var fs = require('fs'),
        path = require('path'),
        compressor = require('./node-minify.js');


    var SCombo = function( req, res ){
        this.qFiles = req.query.files;
        this.qType = req.query.type;

        this.desFiles = global.sBasePath + '/public/' + this.qType + '/work/' + this.qFiles.replace( /\//g, '@' );
        this.oriFiles = this.qFiles.split( ',' );

        this.res = res;
    };

    SCombo.prototype.go = function(){
        var self = this,
            oriFiles = this.oriFiles,
            desFiles = this.desFiles,
            qType = this.qType;

        path.exists( desFiles, function( exists ){

            for( var i = 0, len = oriFiles.length; i < len; i++ ){
                oriFiles[ i ] = global.sBasePath + '/public/' + qType + '/' + oriFiles[ i ];
            }

            if( global.sDebug && exists ){
                self._checkExpire( exists )
            }else{
                self._combo( exists );
            }
        });
    };

    SCombo.prototype._checkExpire = function( exists ){
        var oriFiles = this.oriFiles,
            desFiles = this.desFiles,
            changeTimeList = [];

        for( var i = 0, len = oriFiles.length; i < len; i++ ){

            // 同步检查过期状态
            var thisCTime = fs.statSync( oriFiles[ i ] ).ctime;

            changeTimeList.push( thisCTime );
        }

        var maxCTime = Math.max.apply( Math, changeTimeList ),
            destCTime = fs.statSync( desFiles ).ctime,
            canUseStat = destCTime > maxCTime;

        if( exists && canUseStat ){
            this._combo( true );
        }else{
            this._combo( false );
        }
    };

    SCombo.prototype._combo = function( noCombo ) {
        var res = this.res,
            oriFiles = this.oriFiles,
            desFiles = this.desFiles,
            qType = this.qType;

        if( noCombo ){
            res.sendfile( desFiles );

        }else{
            console.log( '合并了文件：', desFiles );

            fs.open( desFiles, "w", 0666, function( e, fd ) {

                new compressor.minify({
                    type : 'yui' + qType,
                    fileIn : oriFiles,
                    fileOut : desFiles,
                    callback : function( err ) {
                        res.sendfile( desFiles );
                    }
                });
            });
        }
    };

    return SCombo;

})();

exports.version = '0.1.0';
exports.sCombo = sCombo;