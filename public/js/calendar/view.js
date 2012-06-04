/**
 * 日历的view
 */
define(function(require, exports, module) {

	var CalendarCollection = require( './model' ).CalendarCollection;

    // 单条的视图
	var CalendarView = Backbone.View.extend({

		tagName: 'li',
        className: 'calendar-li',

        template: Handlebars.compile( $( '#calendar_item_template' ).html() ),

        events: {
            'click .close': function(){
                this.model.deleteCal();
            }
        },
		
		initialize: function() {
			_.bindAll( this, 'render', 'removeSelf' );
			this.model.bind( 'change', this.render );
            this.model.bind( 'destroy', this.removeSelf );
		},
		
		render: function() {
			$( this.el ).html( this.template( this.model.toJSON() ) );
			return this;
		},

        removeSelf: function(){
            $( this.el ).remove();
        }
	});

    // 集合的视图
	var CalendarCollectionView = Backbone.View.extend({

		el: '#calendar_view',

        events: {
            'click #calendar_view_addbtn': function(){
                this.collection.addCal();
            }
        },

		initialize: function() {

			_.bindAll( this, 'renderItem' );
			this.collection.bind( 'add', this.renderItem );
		},

        renderItem: function( item ) {

            var itemView = new CalendarView({
                model : item
            });
			this.$el.append( itemView.render().el );
		}
	});
	
	exports.init = function(){

        window.globalCalendarCollection = new CalendarCollection();

        new CalendarCollectionView({
            collection: globalCalendarCollection
        });
    };
});