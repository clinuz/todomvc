enyo.kind({
	name: "TodoMVC.RootView",
	kind: "enyo.View",
	fit: false,
	components: [
		{id: "todoapp", tag: "section", components: [
			{kind: "TodoMVC.HeaderView"},
			{kind: "TodoMVC.MainView"},
			{kind: "TodoMVC.FooterView"},
		]},
		{kind: "TodoMVC.InfoView"}
	]
});

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

enyo.kind({
	name: "TodoMVC.ItemView",
	kind: "enyo.View",
	controller: "TodoMVC.ItemController",
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

enyo.kind({
	name: "TodoMVC.ItemController",
	kind: "enyo.ModelController",
	startEditing: function() {
		this.log();
		this.set("editing", true);
	},
	stopEditing: function() {
		this.log();
		this.set("editing", false);
	},
	destroyItem: function() {
		this.model.destroy();
	}
});

enyo.kind({
	name: "TodoMVC.FooterView",
	kind: "enyo.View",
	tag: "footer",
	id: "footer",
	bindings: [
		//{from: "TodoMVC.todosController.remaining", to: "$.count.content"},
		//{from: "TodoMVC.todosController.remaining", to: "$.countLabel.content", transform: "buildLabelText"},
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

enyo.kind({
	name: "TodoMVC.InfoView",
	kind: "enyo.View",
	tag: "footer",
	id: "info",
	components: [
		{tag: "p", content:"Double-click to edit a todo"},
		{tag: "p", content:"Created by the <a href='http://enyojs.com'>Enyo</a> team", allowHtml: true},
		{tag: "p", content:"Part of <a href='http://todomvc.com'>TodoMVC</a>", allowHtml: true}
	]
});

/*
	<section id="todoapp">
		<header id="header">
			<h1>todos</h1>
			<input id="new-todo" placeholder="What needs to be done?" autofocus>
		</header>
		<!-- This section should be hidden by default and shown when there are todos -->
		<section id="main">
			<input id="toggle-all" type="checkbox">
			<label for="toggle-all">Mark all as complete</label>
			<ul id="todo-list">
				<!-- These are here just to show the structure of the list items -->
				<!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
				<li class="completed">
					<div class="view">
						<input class="toggle" type="checkbox" checked>
						<label>Create a TodoMVC template</label>
						<button class="destroy"></button>
					</div>
					<input class="edit" value="Create a TodoMVC template">
				</li>
				<li>
					<div class="view">
						<input class="toggle" type="checkbox">
						<label>Rule the web</label>
						<button class="destroy"></button>
					</div>
					<input class="edit" value="Rule the web">
				</li>
			</ul>
		</section>
		<!-- This footer should hidden by default and shown when there are todos -->
		<footer id="footer">
			<!-- This should be `0 items left` by default -->
			<span id="todo-count"><strong>1</strong> item left</span>
			<!-- Remove this if you don't implement routing -->
			<ul id="filters">
				<li>
					<a class="selected" href="#/">All</a>
				</li>
				<li>
					<a href="#/active">Active</a>
				</li>
				<li>
					<a href="#/completed">Completed</a>
				</li>
			</ul>
			<button id="clear-completed">Clear completed (1)</button>
		</footer>
	</section>
	<footer id="info">
		<p>Double-click to edit a todo</p>
		<!-- Remove the below line ↓ -->
		<p>Template by <a href="http://github.com/sindresorhus">Sindre Sorhus</a></p>
		<!-- Change this out with your name and url ↓ -->
		<p>Created by <a href="http://todomvc.com">you</a></p>
		<p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
	</footer>
*/