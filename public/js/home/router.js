/**
 *  @fileOverview : 主页面的核心路由
 *  @author : Sunwenchao
 *  @description : 对根请求做了转发至相应模块的处理，通过模块的统一方法实现模块分离处理
 */
define(function (require, exports, module) {

    var HomeRouter = Backbone.Router.extend({

        routes : {
            'calendars*path' : 'calendarCommon',

            '' : 'initRedirect'
        },

        calendarCommon : function( path ){
            // 日历模块的统一处理
            require.async( '../calendar/router', function( calendarRouter ) {
                calendarRouter.routeURL( path );
            });
        },

        initRedirect : function(){
            // 根请求转发
            var initPath = 'calendars'

            homeRouter.navigate( initPath, { replace : true } );
        }
    });

    window.homeRouter = new HomeRouter();

    exports.init = function(){

        // Because hash-based history in Internet Explorer relies on an <iframe>,
        // be sure to only call start() after the DOM is ready.
        $(function(){

            var initRoute = Backbone.history.start( { pushState : true, root : "/" } );
        });
    };

});