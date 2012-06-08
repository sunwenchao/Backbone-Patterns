/**
 * 日历添加view
 */
define(function(require, exports, module) {

    var calendarCommon = require( './view-common' );

    // 日程添加的视图
    var CalendarNewView = Backbone.View.extend({

        id : 'calendar_new',

        template : Handlebars.compile( $( '#calendar_new_template' ).html() ),

        events : {
            'click #calendar_view_addbtn' : function() {
                this.collection.addCal();
            }
        },

        initialize : function() {

            var navView = new calendarCommon.CalendarNavwView(),
                containerDom = $( '#container' );

            containerDom.html( navView.render( 'newActive' ) );

            $( this.el ).html( this.template() );

            containerDom.append( this.$el );
        }
    });

    exports.CalendarNewView = CalendarNewView;

});