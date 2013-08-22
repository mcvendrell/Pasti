NavigationController = function() {
    this.windowStack = [];
};

NavigationController.prototype.open = function(windowToOpen) {
    this.windowStack.push(windowToOpen);
    var that = this;
    windowToOpen.addEventListener("close", function() {
        that.windowStack.length > 1 && that.windowStack.pop();
    });
    windowToOpen.navBarHidden = windowToOpen.navBarHidden || false;
    if (1 === this.windowStack.length) {
        windowToOpen.exitOnClose = true;
        windowToOpen.open();
    } else windowToOpen.open();
};

NavigationController.prototype.home = function() {
    var windows = this.windowStack.concat([]);
    for (var i = 1, l = windows.length; l > i; i++) this.navGroup ? this.navGroup.close(windows[i]) : windows[i].close();
    this.windowStack = [ this.windowStack[0] ];
};

NavigationController.prototype.close = function(w) {
    w.close();
};

module.exports = NavigationController;