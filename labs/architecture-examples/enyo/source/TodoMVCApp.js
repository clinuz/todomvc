enyo.kind({
    name: "TodoMVC.Application",
    kind: "enyo.Application",
    view: "TodoMVC.RootView",
    autoStart: true,
    renderOnStart: true,
    /*bindings: [
        {from: "Todos.lists.selection", to: "Todos.selectedList.model"},
        {from: "Todos.selectedList.proxy.selection", to: "Todos.selectedItem.model"}
    ],*/
    controllers: [
        {name: "TodoMVC.todosController", kind: "TodoMVC.TodosController"}
    ]
});
