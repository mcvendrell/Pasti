function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.pillsList = Ti.UI.createWindow({
        id: "pillsList",
        title: L("your_pills")
    });
    $.__views.pillsList && $.addTopLevelView($.__views.pillsList);
    $.__views.listContainer = Ti.UI.createView({
        id: "listContainer"
    });
    $.__views.pillsList.add($.__views.listContainer);
    $.__views.__alloyId1 = Alloy.createController("listPills", {
        id: "__alloyId1",
        __parentSymbol: $.__views.listContainer
    });
    $.__views.__alloyId1.setParent($.__views.listContainer);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var ui = require("navigation");
    var nav = ui.createNavigatorGroup();
    Alloy.Globals.navBar = nav;
    var btnAdd;
    var btnAdd = Ti.UI.createButton({
        title: "+"
    });
    nav.setRightButton($.pillsList, btnAdd);
    btnAdd.addEventListener("click", function() {
        var winAddPill = Alloy.createController("addPill").getView();
        nav.open(winAddPill, {
            animated: true
        });
    });
    nav.open($.pillsList);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;