//var Alloy = require('alloy');
var dbname = Alloy.Globals.dbname;

// Read data from the database and return it
exports.getPills = function() {
    Ti.API.info('Reading data');

    // Our database: this copy the starting database from assets to Resources,
    // if it dont exists yet. If exists, only open it.
    var db = Titanium.Database.install('/data/' + dbname, dbname);
	
	// Get all the pills ordered
	var result = db.execute('SELECT * FROM pills ORDER BY name');
	//Ti.API.info('Total records: ' + result.getRowCount());

	// Save temporarily the data to a var	
	var data = [];
	while (result.isValidRow()) {
		//Ti.API.info('ID: ' + result.field(0) + ' NAME: ' + result.fieldByName('name') + ' FIRST: ' + result.fieldByName('first_take') + ' INT: ' + result.fieldByName('interval'));
		
		// Simple way to add a row (only one text field)
		//data.push(Ti.UI.createTableViewRow({title: result.fieldByName('name')}));
		data.push({
			title: result.fieldByName('name'),
			id: result.fieldByName('id'), // Custom data attribute to pass to detail page
			hasChild: true,
			// Add actual db fields
			name: result.fieldByName("name"),
			first: result.fieldByName("first_take"),
			interval: result.fieldByName("interval")
		});
		
		// Custom way to add a row
		// var row = Ti.UI.createTableViewRow({
			// backgroundColor:'transparent'
		// });

		// var labelName = Ti.UI.createLabel({
    		// color: '#576996',
    		// font: {fontFamily:'Arial', fontSize:18, fontWeight:'bold'},
		    // text: result.fieldByName('name'),
    		// left:5
		// });
  		// row.add(labelName);
 		
		// var labelNum = Ti.UI.createLabel({
    		// color: '#00F',
		    // text: result.fieldByName('interval'),
    		// left: 105
		// });
  		// row.add(labelNum);
 		
		// data.push(row);
			
		result.next();
	}
	result.close();
	// Always close db to save resources
	db.close();
	
	// Return the final data
	return data;
};

exports.addPill = function(name, first_take, interval) {
	var db = Ti.Database.open(dbname);
	db.execute("INSERT INTO pills (name, first_take, interval) VALUES (?,?,?)", name, first_take, interval);
	db.close();

	// Dispatch a message to let other controllers know the database has been updated
	Ti.App.fireEvent("dbUpdated");
};

exports.delPill = function(id) {
	var db = Ti.Database.open(dbname);
	db.execute("DELETE FROM pills WHERE id = ?", id);
	db.close();

	// Dispatch a message to let other controllers know the database has been updated
	Ti.App.fireEvent("dbUpdated");
};

