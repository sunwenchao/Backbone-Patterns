/**
 * 日历添加view
 */
define(function(require, exports, module) {

    // 日程添加的视图
    var CalendarNewView = Backbone.View.extend({

        id : 'calendar_new',

        template : Handlebars.compile( $( '#calendar_new_template' ).html() ),

        events : {
            'click #calendar_view_addbtn' : function() {
                this.collection.addCal();
            },
            'click #to_list_link' : function() {
                homeRouter.navigate( 'calendars', { trigger : true } );
            },
            'click #to_new_link' : function() {
                homeRouter.navigate( 'calendars/new', { trigger : true } );
            }
        },

        initialize : function() {

            $( this.el ).html( this.template() );

            $( '#container' ).html( this.$el );
        }
    });

    exports.CalendarNewView = CalendarNewView;

});