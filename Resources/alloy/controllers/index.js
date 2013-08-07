function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.startWindow = Ti.UI.createWindow({
        backgroundColor: "#DDD",
        id: "startWindow"
    });
    $.__views.startWindow && $.addTopLevelView($.__views.startWindow);
    $.__views.firstDate = Ti.UI.createLabel({
        width: 170,
        height: Ti.UI.SIZE,
        color: "#000",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        text: "First date in take",
        id: "firstDate",
        top: "44",
        left: "20"
    });
    $.__views.startWindow.add($.__views.firstDate);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var db = Titanium.Database.install("/data/pastis", "pastis");
    var pills = db.execute("SELECT * FROM pills ORDER BY id");
    Titanium.API.info("ROW COUNT = " + pills.getRowCount());
    while (pills.isValidRow()) {
        Titanium.API.info("ID: " + pills.field(0) + " NAME: " + pills.fieldByName("name") + " FIRST: " + pills.fieldByName("first_take") + " INT: " + pills.fieldByName("interval"));
        $.table.appendRow("Elemento");
        pills.next();
    }
    pills.close();
    db.close();
    $.index.open();
    if ("iphone" === Ti.Platform.osname) {
        $.add.style = Titanium.UI.iPhone.SystemButtonStyle.PLAIN;
        $.startWindow.setRightNavButton($.add);
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;