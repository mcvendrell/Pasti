exports.createNavigatorGroup = function() {
    function pushNavBar() {
        navView = Ti.UI.createView({
            top: 0,
            height: 44,
            backgroundColor: "#BBB"
        });
        navViews.push(navView);
    }
    function popNavBar() {
        navViews.pop();
        navView = navViews[navViews.length - 1];
    }
    var me = {};
    var navViews = [];
    var navView;
    pushNavBar();
    me.open = function(win) {
        navView.add(Ti.UI.createLabel({
            text: win.title,
            color: "black"
        }));
        if (navViews.length >= 2) {
            var button = Ti.UI.createButton({
                title: "< " + navViews[navViews.length - 2].win.title
            });
            me.addLeftButton(win, button);
            button.addEventListener("click", function() {
                popNavBar();
                win.close();
            });
        }
        navView.win = win;
        win.add(navView);
        win.navBarHidden = true;
        win.open();
        pushNavBar();
    };
    me.close = function(win) {
        if (navViews.length > 1) {
            popNavBar();
            win.close();
        }
    };
    me.addLeftButton = function(win, button) {
        button.top = 5;
        button.left = 5;
        navView.add(button);
    };
    me.setRightButton = function(win, button) {
        button.top = 5;
        button.right = 5;
        navView.add(button);
    };
    return me;
};