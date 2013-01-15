enyo.kind({
    name: "TodoMVC.TodosController",
    kind: "enyo.CollectionRepeaterController",
    collection: "TodoMVC.todos",
    filter: "all",
    autoLoad: true,
    handlers: {
        oncollectionadd: "didAdd",
        onmodelchange: "didAdd",
        oncollectionremove: "didRemove"
    },
    bindings: [
        {from: "TodoMVC.app.filter", to: ".filter"},
        // facade length as the _all_ property
        {from: ".length", to: ".all"}
    ],
    data: enyo.Computed(function () {
        var models;
        switch(this.filter) {
            case "all": models = this.models; break;
            case "active": models = this.collection.remaining(); break;
            case "completed": models = this.collection.completed(); break;
        }
        return models;
    }, "filter", "models", "model"),
    didAdd: function (sender, event) {
        var model = event.model;
        model.save();
    },
    didRemove: function (sender, event) {
        var model = event.model;
        model.destroy();
    },
    active: enyo.Computed(function () {
        return this.collection.remaining().length;
    }, "data"),
    completed: enyo.Computed(function () {
        return this.collection.completed().length;
    }, "data"),
    addTodo: function () {
        this.add({});
    },
    clearTodos: function () {
        this.reset();
    },
    setCompletedForAll: function(value) {
        this.collection.each(function(todo){
            todo.set({completed: value});
        })
    },
    clearCompleted: function() {
        this.collection.remove(this.collection.completed());
    }
});
