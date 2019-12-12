(function() {
    function update() {
        let body = document.body;
        if (body) {
            body.style.setProperty('--screenHeight', screen.height);
            body.style.setProperty('--screenWidth',  screen.width);
            body.style.setProperty('--windowTop',    window.screenTop);
            body.style.setProperty('--windowLeft',   window.screenLeft);
        }
        setTimeout(update, 1000);
    }

    update();
})();
