enyo.kind({
    name: "TodoMVC.TodosController",
    kind: "enyo.CollectionRepeaterController",
    collection: "TodoMVC.todos",
    autoLoad: false,//true,
    handlers: {
        oncollectionadd: "didAdd",
        onmodelchange: "didChange",
        oncollectionloaded: "didLoad"
    },
    addTodo: function () {
        this.add({});
    },
    clearTodos: function () {
        this.reset();
    },
    didAdd: function (sender, event) {
        var model = event.model;
        var collection = this.collection;
        var store = collection.localStorage;
        model.localStorage = store;
        //model.save();
    },
    didChange: function (sender, event) {
        var model = event.model;
        //model.save();
        var changed = model.changed;
        if (changed.hasOwnProperty("completed")) {
            this.sortModels();
        }
    },
    didLoad: function () {
        var collection = this.collection;
        var models = this.models;
        var store = collection.localStorage;
        enyo.forEach(models, function (model) {
            model.localStorage = store;
        });
    },
    sortedModels: null,
    all: 0,
    active: 0,
    completed: 0,
    sortModels: enyo.Observer(function() {
        var models = this.get("models");
        var sorted = {
            all: [],
            active: [],
            completed: []
        };
        var model;
        if (models) {
            for (var i = 0; i < models.length; i++) {
                model = models[i];
                sorted.all.push(model);
                if (model.get("completed")) {
                    sorted.completed.push(model);
                } else {
                    sorted.active.push(model);
                }
            }
        }
        this.log(sorted);
        this.set("sortedModels", sorted);
        this.set("all", sorted.all.length);
        this.set("active", sorted.active.length);
        this.set("completed", sorted.completed.length);
    }, "models"),
    setCompletedForAll: function(value) {
        this.collection.each(function(todo){
            todo.set({completed: value});
        })
    },
    clearCompleted: function() {
        var completed = this.get("sortedModels").completed;
        this.collection.remove(completed);
    }
});
