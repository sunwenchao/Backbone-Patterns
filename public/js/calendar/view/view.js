/**
 * 日历整体view
 */
define(function(require, exports, module) {

    var view_list = require( './view-list.js' );
    var view_item = require( './view-item.js' );

    exports.CalendarListView = view_list.CalendarListView;
    exports.CalendarNewView = view_item.CalendarNewView;
    exports.CalendarItemView = view_item.CalendarItemView;
});