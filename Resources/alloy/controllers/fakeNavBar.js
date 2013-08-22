function Controller() {
    function addItem() {
        var winAddPill = Alloy.createController("addPill").getView();
        winAddPill.open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "fakeNavBar";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.navView = Ti.UI.createView({
        height: 44,
        backgroundColor: "#BBB",
        id: "navView",
        top: "0"
    });
    $.__views.navView && $.addTopLevelView($.__views.navView);
    $.__views.lblTitle = Ti.UI.createLabel({
        color: "black",
        font: {
            fontSize: 20,
            fontWeight: "bold"
        },
        id: "lblTitle",
        text: L("your_pills")
    });
    $.__views.navView.add($.__views.lblTitle);
    $.__views.btnAddPill = Ti.UI.createButton({
        right: 5,
        width: 36,
        height: 36,
        id: "btnAddPill",
        top: "5",
        title: "+"
    });
    $.__views.navView.add($.__views.btnAddPill);
    addItem ? $.__views.btnAddPill.addEventListener("click", addItem) : __defers["$.__views.btnAddPill!click!addItem"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.btnAddPill!click!addItem"] && $.__views.btnAddPill.addEventListener("click", addItem);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;