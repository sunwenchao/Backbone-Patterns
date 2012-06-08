/**
 * 日程列表的view
 */
define(function(require, exports, module) {

    var calendarCommon = require( './view-common' );

    // 单条日程的视图
    var CalendarView = Backbone.View.extend({

        tagName : 'li',
        className : 'calendar-li',

        template : Handlebars.compile( $( '#calendar_item_template' ).html() ),

        events : {
            'click .close' : function() {
                this.model.deleteCal();
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

        removeSelf : function() {
            $( this.el ).remove();
        }
    });

    // 日程集合的视图
    var CalendarListView = Backbone.View.extend({

        id : 'calendar_list',

        template : Handlebars.compile( $( '#calendar_list_template' ).html() ),

        events : {
            'click #calendar_view_addbtn' : function () {
                this.collection.addCal();
            }
        },

        initialize : function() {

            _.bindAll( this, 'renderItem', 'renderAll' );

            this.initRender();

            this.collection.bind( 'reset', this.renderAll );
            this.collection.bind( 'add', this.renderItem );
        },

        renderAll : function() {
            var self = this;

            _( this.collection.models ).each( function( item ) {
                self.renderItem( item );
            });
        },

        initRender : function() {

            var navView = new calendarCommon.CalendarNavwView(),
                containerDom = $( '#container' );

            containerDom.html( navView.render( 'listActive' ) );

            $( this.el ).html( this.template() );

            containerDom.append( this.$el );

            this.renderAll();
        },

        renderItem : function( item ) {

            var itemView = new CalendarView({
                model : item
            });
            this.$el.find( '#calendar_ul' ).append( itemView.render().el );
        }
    });

    exports.CalendarListView = CalendarListView;

});