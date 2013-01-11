enyo.kind({
	name: "TodoMVC.MainView",
	kind: "enyo.View",
	tag: "section",
	id: "main",
	bindings: [
		//{from: "TodoMVC.app.masterToggle", to: "$.toggle.checked", oneWay: false},
		{from: "TodoMVC.todosController.all", to: "$.toggle.showing"},
		{from: "TodoMVC.todosController.active", to: "active"}
	],
	components: [
		{name: "toggle", kind: "enyo.Checkbox", id: "toggle-all", ontap: "toggleTap"},
		{tag: "label", attributes: {for: "toggle-all"}, content: "Mark all as complete"},
		{
			kind: "enyo.CollectionRepeater",
			controller: "TodoMVC.TodoRepeaterController",
			includeScroller: false,
			tag: "ul",
			id: "todo-list",
			components: [
				{kind: "TodoMVC.ItemView"}
			],
			// temp
			name: "repeater"
		}
	],
	toggleTap: function() {
		enyo.asyncMethod(this, function() {
			TodoMVC.todosController.setCompletedForAll(this.$.toggle.checked);
		});
	},
	activeChanged: function(inPrev) {
		var toggle = this.$.toggle;
		var active = this.get("active");
		if (active && !inPrev || inPrev && !active) {
			toggle.set("checked", !active);
		}
	}
});