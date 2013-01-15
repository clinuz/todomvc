enyo.ModelController.extend({
    startEditing: function () {
        this.set("editing", true);
    },
    stopEditing: function () {
        this.set("editing", false);
    },
    destroyItem: function () {
        this.model.destroy();
    }
});
