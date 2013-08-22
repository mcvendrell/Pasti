function MainWindow(t) {
    var self = Ti.UI.createWindow({
        backgroundColor: "#fff"
    });
    alert(t);
    return self;
}

exports.mywin = MainWindow;