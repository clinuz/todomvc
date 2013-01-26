enyo.kind({
    name: "TodoMVC.TodosController",
    kind: "enyo.CollectionController",
    collection: "TodoMVC.todos",
    filter: "all",
    autoLoad: true,
    handlers: {
        didadd: "didAdd",
        didchange: "didChange",
        didremove: "didRemove"
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
        var models = event.values;
        var model;
        var idx;
        for (idx in models) {
            model = models[idx];
            model.save();
        }
        this.inherited(arguments);
    },
    didChange: function (sender, event) {
        var models = event.values;
        var model;
        var idx;
        for (idx in models) {
            model = models[idx];
            model.save();
        }
        this.inherited(arguments);
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
    },
    filterChanged: function () {
        this.dispatchBubble("didreset", {}, this);
    }
});
