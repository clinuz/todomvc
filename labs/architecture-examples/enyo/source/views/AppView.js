enyo.kind({
	name: "TodoMVC.AppView",
	kind: "enyo.View",
	fit: false,
	id: "todoapp",
	tag: "section",
	components: [
	    {kind: "TodoMVC.HeaderView"},
	    {kind: "TodoMVC.MainView"},
	    {kind: "TodoMVC.FooterView"}
	]
});