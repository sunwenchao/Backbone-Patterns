/**
 * 日历的Router
 */
define(function (require, exports, module) {

    var CalendarCollection = require('./model').CalendarCollection;

    var calendarViews = require('./view');

    var globalCalendarCollection = new CalendarCollection();

    var CalendarRouter = Backbone.Router.extend({

        routes : {
            'new' : 'showNewView',
            '' : 'showListView'
        },

        showNewView : function() {
            new calendarViews.CalendarNewView({
                collection : globalCalendarCollection
            });
        },

        showListView : function() {
            new calendarViews.CalendarCollectionView({
                collection : globalCalendarCollection
            });
        }

    });

    window.calendarRouter = new CalendarRouter();

    exports.init = function(){

        $(function(){
            var initRoute = Backbone.history.start( { pushState : true, root : "/calendars/" } );
            console.log( '初始化匹配:', initRoute );
        });
    };

    exports.globalCalendarCollection = globalCalendarCollection;
});