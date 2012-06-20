/**
 * 日程列表的view
 */
define(function(require, exports, module) {

    var calendarCommon = require( './view-common' );

    // 单条日程的视图
    var CalendarView = Backbone.View.extend({

        tagName : 'li',
        className : 'calendar-li',

        template : Handlebars.compile( $( '#calendar_one_template' ).html() ),

        events : {
            // 单条删除按钮
            'click .close' : function() {
                this.model.deleteCal();
            },

            // 双击跳至某条的视图
            'dblclick' : function() {
                homeRouter.navigate( 'calendars/item/' + this.model.get( '_id' ), { trigger : true } );
            }
        },

        initialize : function() {
            _.bindAll( this, 'render', 'removeSelf' );
            this.model.bind( 'change', this.render );
            this.model.bind( 'destroy', this.removeSelf );
        },

        render : function() {
            $( this.el ).html( this.template( this.model.toJSON() ) );
            return this;
        },

        // 模型销毁后 删除DOM
        removeSelf : function() {
            $( this.el ).remove();
        }
    });

    // 日程集合的视图
    var CalendarListView = Backbone.View.extend({

        id : 'calendar_list',

        template : Handlebars.compile( $( '#calendar_list_template' ).html() ),

        events : {
            // 添加测试数据
            'click #add_test' : function() {
                this.collection.addCal( false, {} );
            }
        },

        initialize : function() {

            _.bindAll( this, 'renderItem', 'renderAll' );

            this.initRender();

            this.collection.bind( 'reset', this.renderAll );
            this.collection.bind( 'add', this.renderItem );
        },

        // 集合重置时 全部内容重新渲染
        renderAll : function() {
            var self = this;

            this.collection.sort( { silent : true } ); // 强制排序

            _( this.collection.models ).each( function( item ) {
                self.renderItem( item );
            });
        },

        // 初始化页面DOM
        initRender : function() {

            var navView = new calendarCommon.CalendarNavView(),
                containerDom = $( '#container' );

            containerDom.html( navView.render( 'listActive' ) );

            $( this.el ).html( this.template() );

            containerDom.append( this.$el );

            this.renderAll();
        },

        // 添加单条视图
        renderItem : function( item ) {

            var itemView = new CalendarView({
                model : item
            });
            this.$el.find( '#calendar_ul' ).append( itemView.render().el );
        }
    });

    exports.CalendarListView = CalendarListView;
});