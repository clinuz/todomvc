var TodoMVC = TodoMVC || {};

(function() {
	'use strict';

	// Todo Router
	// ----------

	var Workspace = Backbone.Router.extend({
		routes:{
			'*filter': 'setFilter'
		},

		setFilter: function( param ) {
			// Set the current filter to be used
			var filter = param.trim();
			if (filter === "") {
				filter = "all";
			}
			TodoMVC.app.set('filter', filter);

			// Trigger a collection filter event, causing hiding/unhiding
			// of Todo view items
			//app.Todos.trigger('filter');
		}
	});

	TodoMVC.router = new Workspace();
	//Backbone.history.start();

}());
