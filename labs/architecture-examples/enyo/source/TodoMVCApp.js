enyo.kind({
    name: "TodoMVC.Application",
    kind: "enyo.Application",
    view: "TodoMVC.AppView",
    renderTarget: "#appView",
    autoStart: true,
    renderOnStart: true,
    controllers: [
        {name: "TodoMVC.todosController", kind: "TodoMVC.TodosController"},
        {name: "TodoMVC.router", kind: "TodoMVC.Router"}
    ],
    filter: "all",
    newFilter: function (filter) {
        if (!~TodoMVC.Application.filters.indexOf(filter)) filter = "all";
        this.set("filter", filter);
    },
    statics: {
        filters: ["all","completed","active"]
    }
});
