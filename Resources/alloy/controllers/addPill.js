function Controller() {
    function submitForm() {
        var name = $.txtName.value;
        var days = $.txtDays.value;
        var start;
        var start = $.pikStart.value;
        if ("" != start) {
            utils = require("utils");
            start = utils.dateToString(start);
        }
        if ("" == name || "" == days || "" == start) alert(L("fill_all_fields")); else {
            var db = require("db");
            db.addPill(name, start, days);
            $.win.close();
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "addPill";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "#DDD",
        id: "win",
        title: L("add_pill")
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.lblName = Ti.UI.createLabel({
        left: 10,
        color: "#555",
        id: "lblName",
        top: "65",
        text: L("pill_name")
    });
    $.__views.win.add($.__views.lblName);
    $.__views.txtName = Ti.UI.createTextField({
        left: 90,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: 200,
        maxLength: 30,
        id: "txtName",
        top: "53"
    });
    $.__views.win.add($.__views.txtName);
    $.__views.lblDays = Ti.UI.createLabel({
        left: 10,
        color: "#555",
        id: "lblDays",
        top: "110",
        text: L("days")
    });
    $.__views.win.add($.__views.lblDays);
    $.__views.txtDays = Ti.UI.createTextField({
        left: 90,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: 40,
        maxLength: 2,
        keyboardType: Ti.UI.KEYBOARD_NUMBER_PAD,
        id: "txtDays",
        top: "98"
    });
    $.__views.win.add($.__views.txtDays);
    $.__views.lblStart = Ti.UI.createLabel({
        left: 10,
        color: "#555",
        id: "lblStart",
        top: "151",
        text: L("start_on")
    });
    $.__views.win.add($.__views.lblStart);
    $.__views.pikStart = Ti.UI.createPicker({
        id: "pikStart",
        top: "176",
        type: Ti.UI.PICKER_TYPE_DATE
    });
    $.__views.win.add($.__views.pikStart);
    $.__views.btnSubmit = Ti.UI.createButton({
        width: 120,
        height: 35,
        id: "btnSubmit",
        top: "325",
        title: L("add")
    });
    $.__views.win.add($.__views.btnSubmit);
    submitForm ? $.__views.btnSubmit.addEventListener("click", submitForm) : __defers["$.__views.btnSubmit!click!submitForm"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.btnSubmit!click!submitForm"] && $.__views.btnSubmit.addEventListener("click", submitForm);
    __defers["$.__views.btnSubmit!click!submitForm"] && $.__views.btnSubmit.addEventListener("click", submitForm);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;