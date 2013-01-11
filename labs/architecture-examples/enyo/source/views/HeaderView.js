enyo.kind({
	name: "TodoMVC.HeaderView",
	kind: "enyo.View",
	tag: "header",
	id: "header",
	components: [
		{tag: "h1", content: "todos"},
		{kind: "enyo.Input", id: "new-todo", placeholder: "What needs to be done?", defaultFocus: true, onkeypress: "addOnEnter"}
	],
	addOnEnter: function(inSender, inEvent) {
		if (inEvent.keyCode === 13 && this.$.input.value) {
			TodoMVC.todosController.add({title: this.$.input.value});
			this.$.input.clear();
		}
	}
});