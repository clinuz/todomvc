enyo.kind({
	name: "TodoMVC.AppView",
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