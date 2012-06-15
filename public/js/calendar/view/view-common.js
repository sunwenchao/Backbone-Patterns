/**
 * 日程模块的通用view
 */
define(function(require, exports, module) {

    var navStatus = {
        'listActive' : '',
        'newActive' : ''
    };

    // 日程导航的视图
    var CalendarNavView = Backbone.View.extend({

        id : 'calendar_nav',

        template : Handlebars.compile( $( '#calendar_nav_template' ).html() ),

        events : {
            // 去列表视图
            'click #to_list_link' : function() {
                homeRouter.navigate( 'calendars', { trigger : true } );
            },
            // 去新建视图
            'click #to_new_link' : function() {
                homeRouter.navigate( 'calendars/new', { trigger : true } );
            }
        },

        initialize : function() {
            _.bindAll( this, 'render' );
        },

        // 根据传参 渲染当前active模块
        render : function( activeMod ){
            var obj = {};
            obj[ activeMod ] = true;

            $( this.el ).html( this.template( obj ) );
            return this.$el;
        }
    });

    exports.CalendarNavView = CalendarNavView;
    exports.navStatus = navStatus;
});