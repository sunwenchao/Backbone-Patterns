/**
 * 日历的Router
 */
define(function (require, exports, module) {

    var routerUtil = require( '../util/router-util' );

    var CalendarCollection = require( './model' ).CalendarCollection;

    var calendarViews = require( './view' );

    var globalCalendarCollection = new CalendarCollection();

    // 日历模块的路由列表
    var calendarRouterHandler = routerUtil.createRouterHandlers({

        '/new' : function() {
            new calendarViews.CalendarNewView({
                collection : globalCalendarCollection
            });
        },

        '/' : function() {
            new calendarViews.CalendarCollectionView({
                collection : globalCalendarCollection
            });
        }
    });

    // 对外执行路由处理的方法
    exports.routeURL = function( path ){
        var realPath = path ? path : '/';

        return routerUtil.handleFragment( realPath, calendarRouterHandler );
    };

});