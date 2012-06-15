/**
 *  @fileOverview : 主页面的核心路由
 *  @author : Sunwenchao
 *  @description : 对根请求做了转发至相应模块的处理，通过模块的统一方法实现模块分离处理
 */
define(function (require, exports, module) {

    var HomeRouter = Backbone.Router.extend({

        // 模块路由表
        routes : {

            'calendars*path' : 'calendarCommon',

            '' : 'initRedirect'
        },

        calendarCommon : function( path ){
            // 日历模块的统一处理 分配给子路由进行匹配执行
            require.async( '../calendar/router', function( calendarRouter ) {

                calendarRouter.routeURL( path );
            });
        },

        initRedirect : function(){
            // 根请求转发 针对'www.labi.com' 先假定设置为 calendars
            var initPath = 'calendars';

            homeRouter.navigate( initPath, { replace : true } );
        }
    });

    window.homeRouter = new HomeRouter();

    // 页面入口
    exports.init = function(){

        // Because hash-based history in Internet Explorer relies on an <iframe>,
        // be sure to only call start() after the DOM is ready.
        $(function(){
            Backbone.history.start( { pushState : true, root : "/" } );
        });
    };

});