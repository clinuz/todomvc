enyo.kind({
    name: "TodoMVC.TodoController",
    kind: "enyo.ModelController",
    startEditing: function () {
        this.set("editing", true);
    },
    stopEditing: function () {
        this.set("editing", false);
    },
    destroyItem: function () {
        this.get("model").destroy();
    },
    completedChanged: function () {
        this.log();
    }
});
