/**
 * 日历的Router
 * 此模块同时依赖了所有日历相关文件 统一打包处理
 */
define(function (require, exports, module) {

    var routerUtil = require( '../util/router-util' );

    var calendarViews = require( './view/view.js' );

    var calendarModels = require( './model/model.js' );

    var CalendarModel = calendarModels.Calendar;

    // 日历模块的路由列表
    var calendarRouterHandler = routerUtil.createRouterHandlers({

        // 全部日程列表
        '/' : function() {
            new calendarViews.CalendarListView({
                collection : calendarModels.getCalendarCollection()
            });
        },

        // 新建日程
        '/new' : function() {
            new calendarViews.CalendarNewView({
                collection : calendarModels.getCalendarCollection(),
                model : new CalendarModel()
            });
        },

        // 单条日程编辑
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