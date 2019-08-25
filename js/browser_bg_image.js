setTimeout(function wait() {
    var body = document.body;
    var head = document.head;
    if(body && head) {
        var style = document.createElement('style');
        style.innerHTML = `
            #app {
                background-image: var(--startpageBgImage);
                background-color: var(--startpageBgColor);
                background-size: var(--startpageBgSize);
                background-repeat: var(--startpageBgRepeat);
            }
            #browser {
                backdrop-filter: blur(3px);
                background: transparent !important;
                background-color: transparent !important;
            }
        `;
        head.appendChild(style);
        vivaldi.prefs.get('vivaldi.startpage.background.color', function(bg_color) {
            if (!bg_color) bg_color = '#cccccc';
            vivaldi.prefs.get('vivaldi.startpage.background.color_custom', function(custom_bg_color) {
                if (!custom_bg_color) custom_bg_color = '#bfb8b0';
                vivaldi.prefs.get('vivaldi.startpage.image.enable', function(show_img) {
                    if (show_img === null) show_img = true;
                    vivaldi.prefs.get('vivaldi.startpage.image.path', function(img_path) {
                        if (!img_path) img_path = './../resources/bg.jpg';
                        if (img_path.startsWith('./../') || img_path.startsWith('../')) img_path = img_path.slice(3);
                        vivaldi.prefs.get('vivaldi.startpage.image.path_custom', function(custom_img) {
                            if (!custom_img) custom_img = './../resources/bg.jpg';
                            if (custom_img.startsWith('./../') || custom_img.startsWith('../')) custom_img = custom_img.slice(3);
                            vivaldi.prefs.get('vivaldi.startpage.image.repeat', function(tile_img) {
                                if (tile_img === null) tile_img = false;
                                vivaldi.prefs.get('vivaldi.startpage.image.stretch', function(stretch_img) {
                                    if (stretch_img === null) stretch_img = true;

                                    var bg_img = '';
                                    var bg_clr = '';
                                    if (show_img)
                                        bg_img = img_path === 'user_defined' ? 'url(\'' + custom_img + '\')' : 'url(\'' + img_path + '\')';
                                    bg_clr = bg_color === 'user_defined' ? custom_bg_color : bg_color;
                                    if (bg_clr == '') bg_clr = 'var(--colorBg)';
                                    body.style.setProperty('--startpageBgImage', bg_img);
                                    body.style.setProperty('--startpageBgColor', bg_clr);
                                    body.style.setProperty('--startpageBgRepeat', tile_img ? 'repeat' : 'no-repeat');
                                    body.style.setProperty('--startpageBgSize', stretch_img ? 'cover' : 'auto');
                                });
                            });
                        });
                    });
                });
            });
        });
    }
    else setTimeout(wait, 200);
}, 200);
