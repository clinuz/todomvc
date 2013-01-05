enyo.kind({
    name: "TodoMVC.TodosController",
    kind: "enyo.CollectionController",
    collection: "TodoMVC.todos",
    autoLoad: false,//true
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
        var changed = model.changed;
        var change = enyo.keys(changed)[0];
        //if ("title" === change) model.save();
    },
    didLoad: function () {
        var collection = this.collection;
        var models = this.models;
        var store = collection.localStorage;
        enyo.forEach(models, function (model) {
            model.localStorage = store;
        });
    }
});
