/**
 * 日历的view
 */
define(function(require, exports, module) {
	var model = require("./model");
	var template = Handlebars.compile( $("#calendar_template").html() );
	
	var CalendarView = Backbone.View.extend({
		el: "#calendar",
		
		initialize: function() {
			_.bindAll(this, "render", "addModel");
			this.model.bind("change", this.render);
		},
		
		render: function() {
			$(this.el).find("#calendar_view").text(JSON.stringify(this.model.toJSON()));
			return this;
		}
	});
	
	var CalendarCollectionView = Backbone.View.extend({
		el: "#calendar",
		
		initialize: function() {
			_.bindAll(this, "render");
			this.collection.bind("reset", this.render);
			this.collection.bind("add", this.render);
		},
		
		render: function() {
			this.$el.find("#calendar_view").html(template({calendar: this.collection.toJSON()}));
		},
		
		events: {
			"click input[type=button]": "addModel"
		},
		
		addModel: function() {
			var title = this.$el.find("input[name=title]").val()

			var aCalendar = new model.Calendar({"title": title});

			aCalendar.on("error", function(model, error) {
				console.log(model.get("title") + error);
			});

			aCalendar.save();
		}
	});
	
	exports.init = function(){
        new CalendarCollectionView({
            collection: new model.CalendarCollection()
        });
    };
});