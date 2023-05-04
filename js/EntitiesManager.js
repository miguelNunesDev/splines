var EntitiesManager = (function () {
    function EntitiesManager() {
        this.entities = [];
    }
    EntitiesManager.prototype.register = function (entity) {
        this.entities.push(entity);
    };
    EntitiesManager.prototype.render = function (ctx) {
        this.entities.forEach(function (entity) {
            entity.render(ctx);
        });
    };
    return EntitiesManager;
}());
export { EntitiesManager };
//# sourceMappingURL=EntitiesManager.js.map