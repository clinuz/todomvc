var TodoMVC = TodoMVC || {};

(function() {
	'use strict';

	// Todo Model
	// ----------

	// Our basic **Todo** model has `title`, `order`, and `completed` attributes.
	TodoMVC.Todo = Backbone.Model.extend({

		// Default attributes for the todo
		// and ensure that each todo created has `title` and `completed` keys.
		defaults: {
			title: '',
			completed: false
		}

	});

}());
