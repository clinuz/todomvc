enyo.ready(function () {
    new TodoMVC.Application({name: "TodoMVC.app"});
    Backbone.history.start();
});