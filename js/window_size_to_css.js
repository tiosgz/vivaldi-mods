(function() {
    function update() {
        let body = document.body;
        if (body) {
            body.style.setProperty('--screenHeight', screen.height);
            body.style.setProperty('--screenWidth',  screen.width);
            body.style.setProperty('--windowTop',    window.screenTop);
            body.style.setProperty('--windowLeft',   window.screenLeft);
        }
        // If anything doesn't go well, i.e. it doesn't update,
        // uncomment the line below
        // setTimeout(update, 1000);
    }

    update();
    window.addEventListener('resize', update);
    // TODO: check if it's current window
    // - the resized window ID is passed to the function
    // - you can get the ID of current window with v.wP.getCurrentId(callback)
    vivaldi.windowPrivate.onPositionChanged.addListener(update);
})();
