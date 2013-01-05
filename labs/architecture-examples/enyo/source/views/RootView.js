enyo.kind({
	name: "TodoMVC.RootView",
	kind: "enyo.View",
	layoutKind: "enyo.FittableRowsLayout",
	components: [
		{content: "Hello, TodoMVC."},
		{
			name: "list",
			kind: "enyo.CollectionRepeater",
			controller: "TodoMVC.todosController",
			components: [
				{bindProperty: "title", bindTarget: "content"}
			],
			fit: true
		}

	]
});