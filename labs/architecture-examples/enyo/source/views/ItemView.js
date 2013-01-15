enyo.kind({
	name: "TodoMVC.ItemView",
	kind: "enyo.View",
	tag: "li",
	completed: null,
	bindings: [
		{from: ".controller.completed", to: ".completed"},
		{from: ".controller.editing", to: ".editing"}
	],
	components: [
		{classes: "view", components: [
			{name: "checkbox", kind: "enyo.Checkbox", classes: "toggle",
			    bindFrom: ".completed", bindTo: ".checked", bindOneWay: false},
			{name: "label", tag: "label", ondblclick: "startEditing", bindFrom: ".title"},
			{kind: "enyo.Button", classes: "destroy", ontap: "destroyItem"}
		]},
		{name: "edit", kind: "enyo.Input", classes: "edit", selectOnFocus: true,
		    onblur: "stopEditing", onkeypress: "blurOnEnter", bindFrom: ".title",
		    bindTo: ".value", bindOneWay: false}
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