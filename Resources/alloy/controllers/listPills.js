function Controller() {
    function populateData() {
        var db = require("db");
        var data = db.getPills();
        $.table.setData(data);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "listPills";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.table = Ti.UI.createTableView({
        id: "table"
    });
    $.__views.table && $.addTopLevelView($.__views.table);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.App.addEventListener("dbUpdated", populateData);
    $.table.addEventListener("click", function() {
        var winPill = Alloy.createController("pill").getView();
        winPill.open();
    });
    populateData();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;