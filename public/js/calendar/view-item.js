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

            'keyup #new_title' : function( e ) {
                if ( this.model.validateTitle( $( e.target ).val() ) ){
                    $( '#new_title_con' ).removeClass( 'error' ).addClass( 'success' );
                }else {
                    $( '#new_title_con' ).removeClass( 'success' ).addClass( 'error' );
                }
            },

            'keyup #new_content' : function( e ) {
                if ( this.model.validateContent( $( e.target ).val() ) ){
                    $( '#new_content_con' ).removeClass( 'error' ).addClass( 'success' );
                }else {
                    $( '#new_content_con' ).removeClass( 'success' ).addClass( 'error' );
                }
            },

            'click #new_save' : function() {
                var result = this.model.set({
                    title : $( '#new_title' ).val(),
                    content : $( '#new_content' ).val()
                });

                if( result ) this.model.save();
            },

            'click #new_cancel' : function() {
                history.back();
            }
        },

        initialize : function() {
            _.bindAll( this, 'syncComplete' );

            this.initNewView();
            this.initNewModel();
        },

        initNewView : function() {

            var navView = new calendarCommon.CalendarNavwView(),
                containerDom = $( '#container' );

            containerDom.html( navView.render( 'newActive' ) );

            $( this.el ).html( this.template() );

            containerDom.append( this.$el );
        },

        initNewModel : function() {

            this.model.bind( 'sync', this.syncComplete );
        },

        syncComplete : function( model ) {

            this.collection.add( model );
            _.defer( function() {
                homeRouter.navigate( 'calendars', { trigger : true } );
            });
        }
    });





    // 单个日程的视图
    var CalendarItemView = Backbone.View.extend({

        id : 'calendar_item',

        template : Handlebars.compile( $( '#calendar_item_template' ).html() ),

        events : {
            'click #calendar_view_addbtn' : function() {
                this.collection.addCal();
            }
        },

        initialize : function() {

            var navView = new calendarCommon.CalendarNavwView(),
                containerDom = $( '#container' );

            containerDom.html( navView.render( 'noneActive' ) );

            $( this.el ).html( this.template() );

            containerDom.append( this.$el );
        }
    });

    exports.CalendarNewView = CalendarNewView;
    exports.CalendarItemView = CalendarItemView;
});