/**
 * 日历的model
 */
define(function(require, exports, module) {

	var Calendar = Backbone.Model.extend({

        urlRoot: "/calendars",

		initialize: function() {

		},
		
		validate: function(attrs) {
			if (!attrs.title) {
				return "title must not be empty";
			}
		},
		
		parse: function(response) {
			return response;
		}
	});
	
	var CalendarCollection = Backbone.Collection.extend({
		model: Calendar,
		
		url: "/calendars",
		
		initialize: function() {
			this.fetch();
		}
	});
	
	exports.Calendar = Calendar;
	exports.CalendarCollection = CalendarCollection;
});