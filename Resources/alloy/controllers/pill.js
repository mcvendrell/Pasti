function Controller() {
    function goBack() {
        $.winPill.close();
    }
    function doClick1() {
        alert("Restando!");
    }
    function doClick2() {
        alert("Sumando!");
    }
    function substractDays() {
        diasDeSalto -= 1;
        0 == diasDeSalto && (diasDeSalto = 1);
        $.days.text = diasDeSalto;
    }
    function addDays() {
        diasDeSalto += 1;
        diasDeSalto > 31 && (diasDeSalto = 31);
        $.days.text = diasDeSalto;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "pill";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.winPill = Ti.UI.createWindow({
        backgroundColor: "#DDD",
        id: "winPill"
    });
    $.__views.winPill && $.addTopLevelView($.__views.winPill);
    $.__views.navView = Ti.UI.createView({
        height: 44,
        backgroundColor: "#BBB",
        id: "navView",
        top: "0"
    });
    $.__views.winPill.add($.__views.navView);
    $.__views.btnBack = Ti.UI.createButton({
        left: 5,
        width: Ti.UI.SIZE,
        height: 36,
        font: {
            fontSize: 14
        },
        id: "btnBack",
        top: "5",
        title: L("back")
    });
    $.__views.navView.add($.__views.btnBack);
    goBack ? $.__views.btnBack.addEventListener("click", goBack) : __defers["$.__views.btnBack!click!goBack"] = true;
    $.__views.lblTitle = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "black",
        font: {
            fontSize: 20,
            fontWeight: "bold"
        },
        textAlign: "center",
        id: "lblTitle"
    });
    $.__views.navView.add($.__views.lblTitle);
    $.__views.datePicker = Ti.UI.createPicker({
        id: "datePicker",
        top: "120",
        selectionIndicator: "true",
        type: Ti.UI.PICKER_TYPE_DATE
    });
    $.__views.winPill.add($.__views.datePicker);
    $.__views.intakeDays = Ti.UI.createLabel({
        width: 120,
        height: Ti.UI.SIZE,
        color: "#000",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        text: "Days for the next in take",
        id: "intakeDays",
        top: "279",
        left: "40"
    });
    $.__views.winPill.add($.__views.intakeDays);
    $.__views.days = Ti.UI.createLabel({
        width: 30,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: "25sp"
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        text: "2",
        id: "days",
        top: "285",
        left: "165"
    });
    $.__views.winPill.add($.__views.days);
    $.__views.buttonMinus2 = Ti.UI.createButton({
        width: 50,
        height: 30,
        borderRadius: 0,
        borderWidth: 0,
        id: "buttonMinus2",
        title: "-",
        top: "285",
        left: "205"
    });
    $.__views.winPill.add($.__views.buttonMinus2);
    substractDays ? $.__views.buttonMinus2.addEventListener("click", substractDays) : __defers["$.__views.buttonMinus2!click!substractDays"] = true;
    $.__views.buttonPlus2 = Ti.UI.createButton({
        width: 50,
        height: 30,
        borderRadius: 0,
        borderWidth: 0,
        id: "buttonPlus2",
        title: "+",
        top: "285",
        left: "255"
    });
    $.__views.winPill.add($.__views.buttonPlus2);
    addDays ? $.__views.buttonPlus2.addEventListener("click", addDays) : __defers["$.__views.buttonPlus2!click!addDays"] = true;
    $.__views.todayDate = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        text: "Today is...",
        id: "todayDate",
        top: "330",
        left: "10"
    });
    $.__views.winPill.add($.__views.todayDate);
    $.__views.isDay = Ti.UI.createLabel({
        width: 132,
        height: 30,
        color: "#000",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        borderRadius: 15,
        text: "OH, YES!",
        id: "isDay",
        top: "325",
        left: "184"
    });
    $.__views.winPill.add($.__views.isDay);
    $.__views.Mon = Ti.UI.createLabel({
        width: 42,
        height: 42,
        color: "#000",
        top: 370,
        font: {
            fontSize: "15sp"
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "#BBB",
        borderRadius: 21,
        text: "Mon",
        id: "Mon",
        left: "4"
    });
    $.__views.winPill.add($.__views.Mon);
    $.__views.Tue = Ti.UI.createLabel({
        width: 42,
        height: 42,
        color: "#000",
        top: 370,
        font: {
            fontSize: "15sp"
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "#BBB",
        borderRadius: 21,
        text: "Tue",
        id: "Tue",
        left: "49"
    });
    $.__views.winPill.add($.__views.Tue);
    $.__views.Wed = Ti.UI.createLabel({
        width: 42,
        height: 42,
        color: "#FFF",
        top: 370,
        font: {
            fontSize: "15sp"
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "#2E2EFE",
        borderRadius: 21,
        text: "Wed",
        id: "Wed",
        left: "94"
    });
    $.__views.winPill.add($.__views.Wed);
    $.__views.Thu = Ti.UI.createLabel({
        width: 42,
        height: 42,
        color: "#000",
        top: 370,
        font: {
            fontSize: "15sp"
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "#BBB",
        borderRadius: 21,
        text: "Thu",
        id: "Thu",
        left: "139"
    });
    $.__views.winPill.add($.__views.Thu);
    $.__views.Fri = Ti.UI.createLabel({
        width: 42,
        height: 42,
        color: "#FFF",
        top: 370,
        font: {
            fontSize: "15sp"
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "#2E2EFE",
        borderRadius: 21,
        text: "Fri",
        id: "Fri",
        left: "184"
    });
    $.__views.winPill.add($.__views.Fri);
    $.__views.Sat = Ti.UI.createLabel({
        width: 42,
        height: 42,
        color: "#000",
        top: 370,
        font: {
            fontSize: "15sp"
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "#BBB",
        borderRadius: 21,
        text: "Sat",
        id: "Sat",
        left: "229"
    });
    $.__views.winPill.add($.__views.Sat);
    $.__views.Sun = Ti.UI.createLabel({
        width: 42,
        height: 42,
        color: "#000",
        top: 370,
        font: {
            fontSize: "15sp"
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "#BBB",
        borderRadius: 21,
        text: "Sun",
        id: "Sun",
        left: "274"
    });
    $.__views.winPill.add($.__views.Sun);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var diasDeSalto = 1;
    $.days.text = diasDeSalto;
    __defers["$.__views.buttonMinus1!click!doClick1"] && $.__views.buttonMinus1.addEventListener("click", doClick1);
    __defers["$.__views.buttonPlus1!click!doClick2"] && $.__views.buttonPlus1.addEventListener("click", doClick2);
    __defers["$.__views.buttonMinus2!click!substractDays"] && $.__views.buttonMinus2.addEventListener("click", substractDays);
    __defers["$.__views.buttonPlus2!click!addDays"] && $.__views.buttonPlus2.addEventListener("click", addDays);
    __defers["$.__views.btnBack!click!goBack"] && $.__views.btnBack.addEventListener("click", goBack);
    __defers["$.__views.buttonMinus2!click!substractDays"] && $.__views.buttonMinus2.addEventListener("click", substractDays);
    __defers["$.__views.buttonPlus2!click!addDays"] && $.__views.buttonPlus2.addEventListener("click", addDays);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;