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