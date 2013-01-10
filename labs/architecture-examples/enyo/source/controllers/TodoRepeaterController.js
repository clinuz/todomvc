enyo.kind({
	name: "TodoMVC.TodoRepeaterController",
	kind: "enyo.CollectionRepeaterController",
	filter: "",
    bindings: [
        {from: "TodoMVC.app.filter", to: "filter"},
        {from: "TodoMVC.todosController.sortedModels", to: "sortedModels"}
    ],
    data: enyo.Computed(function() {
        var filter = this.get("filter");
        var sortedModels = this.get("sortedModels");
        if (!sortedModels) {
        	return [];
        }
        return sortedModels[filter];
    }, "sortedModels", "filter"),
    dataChanged: function() {
        this.renderAllRows();
    }
});