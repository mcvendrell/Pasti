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
			interval: result.fieldByName("interval"),
			// Config
			color: 'black'
		});
		
		result.next();
	}
	result.close();
	// Always close db to save resources
	db.close();
	
	// Return the final data
	return data;
};

// Read data from the database and return it
exports.getPillsWithStatus = function() {
    Ti.API.info('Reading data with status');

    // Our database: this copy the starting database from assets to Resources,
    // if it dont exists yet. If exists, only open it.
    var db = Titanium.Database.install('/data/' + dbname, dbname);
	
	// Get all the pills ordered
	var result = db.execute('SELECT * FROM pills ORDER BY name');

	// Get access to the logic
	var Brain = require('pastiBrain').Brain,
		brain = new Brain();
	var util = require('util');
	var today = new Date();
	
	// Change the bgcolor and color of a label, depending if is active or not
	function setDayStatus(label, active) {
		label.color = active ? "white" : "black";
		label.backgroundColor = active ? Alloy.Globals.blueColor : Alloy.Globals.greyColor;
	}

	// Save temporarily the data to a var	
	var data = [];
	while (result.isValidRow()) {
		// Get the data and calculate is today must take the pill
		var firstDay = util.stringToDate(result.fieldByName("first_take"));
		var itsTime = brain.todayTake(Math.abs(util.dateDiffInDays(today, firstDay)), result.fieldByName("interval"));

		// Custom way to add a row
		var row = Ti.UI.createTableViewRow({
			// Add actual db fields
			id: result.fieldByName('id'),
			name: result.fieldByName("name"),
			first: result.fieldByName("first_take"),
			interval: result.fieldByName("interval"),
			// Config
			height: 38,
			hasChild: true,
			color: 'black',
			backgroundColor: 'transparent'
		});

		// Take indicator
		var labelTake = Ti.UI.createLabel({
    		left: 5,
    		width: 45,
    		font: {
    			fontFamily: 'Arial',
    			fontSize: 18,
    			fontWeight: 'bold'
			},
		    text: itsTime ? L("YES") : L("NO"),
		    textAlign: 'center',
		    backgroundColor: '#AAA',
	      	borderRadius: 5

		});
		setDayStatus(labelTake, itsTime);
  		row.add(labelTake);
 		
		var labelName = Ti.UI.createLabel({
    		left: 60,
    		font: {
    			fontFamily: 'Arial',
    			fontSize: 22
			},
			color: 'black',
		    text: result.fieldByName('name')
		});
  		row.add(labelName);

		data.push(row);
			
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
	Ti.App.fireEvent("app:dbUpdated");
};

exports.delPill = function(id) {
	var db = Ti.Database.open(dbname);
	db.execute("DELETE FROM pills WHERE id = ?", id);
	db.close();

	// Dispatch a message to let other controllers know the database has been updated
	Ti.App.fireEvent("app:dbUpdated");
};

exports.updatePill = function(id, field, value, notify) {
	var db = Ti.Database.open(dbname);
	db.execute("UPDATE pills set " + field + " = ? WHERE id = ?", value, id);
	db.close();

	// Dispatch a message to let other controllers know the database has been updated
	if (notify) {
		Ti.App.fireEvent("app:dbUpdated");
	}
};

