function MainWindow(t) {	
	// Create window
	var self = Ti.UI.createWindow({
		backgroundColor: '#fff'
	});
 	alert(t);
	// Return window
	return self;
}
 
exports.mywin = MainWindow;