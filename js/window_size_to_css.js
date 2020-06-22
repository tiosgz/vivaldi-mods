(function() {
    let lastX = -1;
    let lastY = -1;
    let lastWidth = 0;
    let lastHeight = 0;

    function update() {
        let body = document.body;
        if (body) {
            if (screen.width !== lastWidth) {
                body.style.setProperty('--screenWidth',  screen.width);
                lastWidth = screen.width;
            }
            if (screen.height !== lastHeight) {
                body.style.setProperty('--screenHeight', screen.height);
                lastHeight = screen.height;
            }
            if (window.screenLeft !== lastX) {
                body.style.setProperty('--windowLeft',   window.screenLeft);
                lastX = window.screenLeft;
            }
            if (window.screenTop !== lastY) {
                body.style.setProperty('--windowTop',    window.screenTop); 
                lastY = window.screenTop;
            }
        }
        setTimeout(update, 250);
    }
    function setZoom(z) {
        if (z && document.body)
            document.body.style.setProperty('--vivUIZoom', z);
    }

    update();
    vivaldi.zoom.getVivaldiUIZoom(setZoom);
    window.addEventListener('resize', update);
    vivaldi.zoom.onUIZoomChanged.addListener(setZoom);
    // TODO: check if it's current window
    // - the resized window ID is passed to the function
    // - you can get the ID of current window with v.wP.getCurrentId(callback)
    vivaldi.windowPrivate.onPositionChanged.addListener(update);
})();
