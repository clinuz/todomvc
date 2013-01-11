enyo.kind({
	name: "TodoMVC.ItemViewController",
	kind: "enyo.ModelController",
	startEditing: function() {
		this.set("editing", true);
	},
	stopEditing: function() {
		this.set("editing", false);
	},
	destroyItem: function() {
		this.model.destroy();
	}
});