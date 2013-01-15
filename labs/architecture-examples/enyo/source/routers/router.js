enyo.kind({
    name: "TodoMVC.Router",
    kind: "enyo.Router",
    routes: [
        {path: "/:filter", handler: "newFilter", context: "TodoMVC.app"}
    ]
});
