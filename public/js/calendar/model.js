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
        },

        validate : function( attrs ) {
            if( !this.validateTitle( attrs.title ) ) return 'title';
            if( !this.validateContent( attrs.content ) ) return 'content';
        },

        validateTitle : function( title ) {
            return title === '' ? false : true;
        },

        validateContent : function( content ) {
            return content === '' ? false : true;
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

        addCal : function( oriObj, opts ) {
            opts.wait = true;

            return this.create( oriObj, opts );
        },

        comparator : function( calendar ) {
            return -calendar.get( 'updatetime' );
        }
    });

    exports.Calendar = Calendar;
    exports.CalendarCollection = CalendarCollection;

});