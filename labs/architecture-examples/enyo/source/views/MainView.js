enyo.kind({
	name: "TodoMVC.MainView",
	kind: "enyo.View",
	tag: "section",
	id: "main",
	bindings: [
		{from: "TodoMVC.todosController.all", to: "$.toggle.showing"},
		{from: "TodoMVC.todosController.active", to: ".$.toggle.checked", transform: "activeTransform"}
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
	activeTransform: function (value, direction, binding) {
        // this test-case will not allow it to propagate the value
        // if it is already set correctly
	    var cur = this.$.toggle.get("checked");
        if (value && !cur) binding.stop();
        else if (value && cur) return false;
        else if (cur) binding.stop();
        else return true;
        // the following would have worked with the same effect
        // and would appear simpler but less precise
        // if (value) return false;
        // else return true;
	}
});