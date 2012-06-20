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
            // 验证合法输入的效果
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

            // 新建按钮
            'click #new_save' : function() {
                var result = this.model.set({
                    title : $( '#new_title' ).val(),
                    content : $( '#new_content' ).val()
                });

                if( result ) this.model.save();
            },

            // 取消按钮 回退上一页
            'click #new_cancel' : function() {
                history.back();
            }
        },

        initialize : function() {
            _.bindAll( this, 'syncComplete' );

            this.initNewView();
            this.initNewModel();
        },

        // 初始化页面DOM
        initNewView : function() {

            var navView = new calendarCommon.CalendarNavView(),
                containerDom = $( '#container' );

            containerDom.html( navView.render( 'newActive' ) );

            $( this.el ).html( this.template() );

            containerDom.append( this.$el );
        },

        // 初始化数据
        initNewModel : function() {
            this.model.bind( 'sync', this.syncComplete );
        },

        // 新建成功的回调
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

            // 保存编辑内容
            'click #item_save' : function() {
                var result = this.model.set({
                    title : $( '#item_title' ).val(),
                    content : $( '#item_content' ).val()
                });

                if( result ) this.model.save();
            },

            // 取消按钮 回退上一页
            'click #item_cancel' : function() {
                history.back();
            }
        },

        initialize : function() {

            _.bindAll( this, 'render', 'syncComplete' );
            this.model.bind( 'change', this.render );
            this.model.bind( 'sync', this.syncComplete );

            this.initNewView();

            // 判断当前请求模型数据是否已加载
            if( this.model.isNew() ) {
                this.model.id = this.model.get( 'id' );
                this.model.fetch();
            }
        },

        // 初始化页面DOM
        initNewView : function() {

            var navView = new calendarCommon.CalendarNavView(),
                containerDom = $( '#container' );

            containerDom.html( navView.render( 'noneActive' ) );

            containerDom.append( this.render() );
        },

        render : function() {
            return $( this.el ).html( this.template( this.model.toJSON() ) );
        },

        // 保存后回调
        syncComplete : function() {
            _.defer( function() {
                homeRouter.navigate( 'calendars', { trigger : true } );
            });
        }
    });

    exports.CalendarNewView = CalendarNewView;
    exports.CalendarItemView = CalendarItemView;
});