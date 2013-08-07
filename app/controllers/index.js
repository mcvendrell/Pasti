/*
 * We have a database with all our pills and the data we started to take it
 * Also the number of days between intakes
 * We only need to calculate the days between the first intake and today to
 * know if today is a day for intake or not, for each pill
 */

// Our database
//var db = Titanium.Database.open('pills');
var db = Titanium.Database.install('/data/pastis', 'pastis');

// On every start, if database don't exists, create it	
//db.execute('CREATE TABLE IF NOT EXISTS pills (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, first_take TEXT, interval INTEGER)');
	
//db.execute('INSERT INTO DATABASETEST (ID, NAME ) VALUES(?,?)',4,'Name 4');
//db.execute('UPDATE DATABASETEST SET NAME = "I was updated too" WHERE ID = 2');
//Titanium.API.info('JUST INSERTED, rowsAffected = ' + db.rowsAffected);
//Titanium.API.info('JUST INSERTED, lastInsertRowId = ' + db.lastInsertRowId);

// Get all the pills
var pills = db.execute('SELECT * FROM pills ORDER BY id');
Titanium.API.info('ROW COUNT = ' + pills.getRowCount());

while (pills.isValidRow()) {
	Titanium.API.info('ID: ' + pills.field(0) + ' NAME: ' + pills.fieldByName('name') + ' FIRST: ' + pills.fieldByName('first_take') + ' INT: ' + pills.fieldByName('interval'));
	$.table.appendRow('Elemento')
	pills.next();
}
pills.close();
// Always close db when you're done to save resources
db.close();

$.index.open();

//
// INITIALIZERS
//
// add the add button, this can be refactored
if (Ti.Platform.osname === 'iphone') {
    $.add.style = Titanium.UI.iPhone.SystemButtonStyle.PLAIN;
    //$.add.addEventListener('click', addNewFugitive);
    $.startWindow.setRightNavButton($.add);
}

