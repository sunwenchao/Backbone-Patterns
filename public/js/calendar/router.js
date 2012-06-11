/**
 * 日历的Router
 */
define(function (require, exports, module) {

    var routerUtil = require( '../util/router-util' );

    var calendarViews = require( './view' );

    var calendarModels = require( './model' );

    var CalendarModel = calendarModels.Calendar;

    var CalendarCollection = calendarModels.CalendarCollection;

    var globalCalendarCollection = new CalendarCollection();

    // 日历模块的路由列表
    var calendarRouterHandler = routerUtil.createRouterHandlers({

        '/' : function() {
            new calendarViews.CalendarListView({
                collection : globalCalendarCollection
            });
        },

        '/new' : function() {
            new calendarViews.CalendarNewView({
                collection : globalCalendarCollection,
                model : new CalendarModel()
            });
        },

        '/item/:guid' : function( guid ) {
            new calendarViews.CalendarNewView({
                reqId : guid
            });
        }
    });

    // 对外执行路由处理的方法
    exports.routeURL = function( path ){
        var realPath = path ? path : '/';

        return routerUtil.handleFragment( realPath, calendarRouterHandler );
    };

});