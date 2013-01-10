enyo.kind({
    name: "TodoMVC.Application",
    kind: "enyo.Application",
    view: "TodoMVC.RootView",
    autoStart: true,
    renderOnStart: true,
    controllers: [
        {name: "TodoMVC.todosController", kind: "TodoMVC.TodosController"}
    ],
    filter: "all"
});
