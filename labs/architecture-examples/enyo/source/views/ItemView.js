enyo.kind({
	name: "TodoMVC.ItemView",
	kind: "enyo.View",
	controller: "TodoMVC.ItemViewController",
	tag: "li",
	completed: null,
	bindings: [
		{from: "controller.title", to: "$.label.content"},
		{from: "controller.title", to: "$.edit.value", oneWay: false},
		{from: "controller.completed", to: "$.checkbox.checked", oneWay: false},
		{from: "controller.completed", to: "completed"},
		{from: "controller.editing", to: "editing"}
	],
	components: [
		{classes: "view", components: [
			{name: "checkbox", kind: "enyo.Checkbox", classes: "toggle"},
			{name: "label", tag: "label", ondblclick: "startEditing"},
			{kind: "enyo.Button", classes: "destroy", ontap: "destroyItem"}
		]},
		{name: "edit", kind: "enyo.Input", classes: "edit", selectOnFocus: true, onblur: "stopEditing", onkeypress: "blurOnEnter"}
	],
	setItemClass: enyo.Observer(function() {
		this.addRemoveClass("completed", this.completed);
		this.addRemoveClass("editing", this.editing);
	}, "completed", "editing"),
	edit: enyo.Observer(function() {
		if (this.editing) {
			this.$.edit.focus();
		}
	}, "editing"),
	blurOnEnter: function(inSender, inEvent) {
		if (inEvent.keyCode === 13) {
			// TODO: Why don't we expose blur on enyo.Input?
			this.$.edit.node.blur();
		}
	}
});