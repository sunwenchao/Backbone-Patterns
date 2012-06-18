/**
 * 日历的model
 */
define(function (require, exports, module) {

    var globalCalendarCollection = false;

    // 单个日程的Model
    var Calendar = Backbone.Model.extend({

        // 标识根URL
        urlRoot : '/calendars',

        idAttribute : '_id',

        // 删除此条日程
        deleteCal : function() {
            this.destroy();
        },

        validate : function( attrs ) {
            if( !this.validateTitle( attrs.title ) ) return 'title';
            if( !this.validateContent( attrs.content ) ) return 'content';
        },

        // 验证标题
        validateTitle : function( title ) {
            return title === '' ? false : true;
        },

        // 验证内容
        validateContent : function( content ) {
            return content === '' ? false : true;
        }
    });

    // 日程集合的Collection
    var CalendarCollection = Backbone.Collection.extend({

        model : Calendar,

        url : function() {
            return '/calendars?ts=' + Number( new Date() );
        },

        initialize : function() {
            this.fetch();
        },

        // 增加一条日程
        addCal : function( oriObj, opts ) {

            if( !oriObj ) {
                oriObj = {
                    title : '测试标题',
                    content : '我是测试内容，我是测试内容，我是测试内容，我是测试内容，我是测试内容，我是测试内容，' +
                        '我是测试内容，我是测试内容，我是测试内容，我是测试内容，我是测试内容。'
                };
            }

            opts.wait = true;

            return this.create( oriObj, opts );
        },

        // 按更新日期倒序排
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