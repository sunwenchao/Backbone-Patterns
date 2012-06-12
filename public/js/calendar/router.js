/**
 * 日历的Router
 */
define(function (require, exports, module) {

    var routerUtil = require( '../util/router-util' );

    var calendarViews = require( './view' );

    var calendarModels = require( './model' );

    var CalendarModel = calendarModels.Calendar;

    // 日历模块的路由列表
    var calendarRouterHandler = routerUtil.createRouterHandlers({

        '/' : function() {
            new calendarViews.CalendarListView({
                collection : calendarModels.getCalendarCollection()
            });
        },

        '/new' : function() {
            new calendarViews.CalendarNewView({
                collection : calendarModels.getCalendarCollection(),
                model : new CalendarModel()
            });
        },

        '/item/:id' : function( id ) {
            new calendarViews.CalendarItemView({
                model : calendarModels.getCalendarById( id )
            });
        }
    });

    // 对外执行路由处理的方法
    exports.routeURL = function( path ){
        var realPath = path ? path : '/';

        return routerUtil.handleFragment( realPath, calendarRouterHandler );
    };

});