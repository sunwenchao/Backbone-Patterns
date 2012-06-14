/**
 * 日历的model
 */
define(function (require, exports, module) {

    var globalCalendarCollection = false;

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

    exports.getCalendarCollection = function() {
        // 单例获取日历
        if( !globalCalendarCollection ) {
            globalCalendarCollection = new CalendarCollection();
        }
        return globalCalendarCollection;
    };

    exports.getCalendarById = function( id ) {
        // 优先查找 collection 中的数据
        if( globalCalendarCollection && globalCalendarCollection.get( id ) ) {
            return globalCalendarCollection.get( id );

        }else {
            return new Calendar( { id : id } );
        }
    };
});