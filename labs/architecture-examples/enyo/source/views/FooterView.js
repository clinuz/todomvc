enyo.kind({
	name: "TodoMVC.FooterView",
	kind: "enyo.View",
	tag: "footer",
	id: "footer",
	bindings: [
		{from: "TodoMVC.app.filter", to: "filter"},
		{from: "TodoMVC.todosController.all", to: "all"},
		{from: "TodoMVC.todosController.active", to: "active"},
		{from: "TodoMVC.todosController.completed", to: "completed"}
	],
	components: [
		{tag: "span", id: "todo-count", components: [
			{name: "count", tag: "strong", content: "0"},
			{name: "countLabel", tag: "span", content: " items left"}
		]},
		{tag: "ul", id: "filters", components: [
			{tag: "li", components: [
				{name: "all", tag: "a", content: "All", attributes: {href: "#/"}}
			]},
			{tag: "li", components: [
				{name: "active", tag: "a", content: "Active", attributes: {href: "#/active"}}
			]},
			{tag: "li", components: [
				{name: "completed", tag: "a", content: "Completed", attributes: {href: "#/completed"}}
			]}		
		]},
		{name: "clear", kind: "enyo.Button", id: "clear-completed", content: "Clear completed (1)", ontap: "clearCompleted"}
	],
	labelText: function() {
		var active = this.get("active");
		var item = (active === 1) ? "item" : "items";
		return " " + item + " left";
	},
	buttonText: function() {
		var completed = this.get("completed");
		return "Clear completed (" + completed + ")";
	},
	filterChanged: function(inPrev) {
		var filter = this.get("filter");
		this.$[filter].addClass("selected");
		if (typeof inPrev !== "undefined") {
			this.$[inPrev].removeClass("selected");
		}
	},
	allChanged: function(inPrev) {
		if (this.all) {
			this.show();
		} else {
			this.hide();
		}
	},
	activeChanged: function(inPrev) {
		this.$.count.set("content", this.get("active"));
		this.$.countLabel.set("content", this.labelText());
	},
	completedChanged: function(inPrev) {
		var completed = this.get("completed");
		if (completed) {
			this.$.clear.show();
		} else {
			this.$.clear.hide();
		}
		this.$.clear.set("content", this.buttonText());
	},
	clearCompleted: function() {
		TodoMVC.todosController.clearCompleted();
	}
});