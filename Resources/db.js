var dbname = Alloy.Globals.dbname;

exports.getPills = function() {
    Ti.API.info("Reading data");
    var db = Titanium.Database.install("/data/" + dbname, dbname);
    var result = db.execute("SELECT * FROM pills ORDER BY name");
    var data = [];
    while (result.isValidRow()) {
        data.push({
            title: result.fieldByName("name"),
            id: result.fieldByName("id"),
            hasChild: true,
            name: result.fieldByName("name"),
            first: result.fieldByName("first_take"),
            interval: result.fieldByName("interval")
        });
        result.next();
    }
    result.close();
    db.close();
    return data;
};

exports.addPill = function(name, first_take, interval) {
    var db = Ti.Database.open(dbname);
    db.execute("INSERT INTO pills (name, first_take, interval) VALUES (?,?,?)", name, first_take, interval);
    db.close();
    Ti.App.fireEvent("dbUpdated");
};

exports.delPill = function(id) {
    var db = Ti.Database.open(dbname);
    db.execute("DELETE FROM pills WHERE id = ?", id);
    db.close();
    Ti.App.fireEvent("dbUpdated");
};