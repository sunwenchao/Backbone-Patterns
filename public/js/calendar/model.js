/**
 * 日历的model
 */
define(function (require, exports, module) {

    var Calendar = Backbone.Model.extend({

        urlRoot : '/calendars',

        idAttribute : '_id',

        initialize : function() {

        },

        deleteCal : function() {
            this.destroy();
        }
    });

    var CalendarCollection = Backbone.Collection.extend({

        model : Calendar,

        url : function() {
            return '/calendars?ts=' + Number( new Date() );
        },

        initialize : function() {
            this.fetch();
        },

        addCal : function() {
            this.create( {} );
        }
    });

    exports.Calendar = Calendar;
    exports.CalendarCollection = CalendarCollection;

});