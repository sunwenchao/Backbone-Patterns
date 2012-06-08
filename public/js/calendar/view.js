/**
 * 日历整体view
 */
define(function(require, exports, module) {

    var view_list = require( './view-list' );
    var view_item = require( './view-item' );

    exports.CalendarCollectionView = view_list.CalendarCollectionView;
    exports.CalendarNewView = view_item.CalendarNewView;
});