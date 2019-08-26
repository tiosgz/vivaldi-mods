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
                /*backdrop-filter: blur(3px);*/
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

                                    var final_img_path = 'url(\'' + (img_path === 'user_defined' ? custom_img : img_path) + '\')';
                                    var bg_img = show_img ? 'var(--startpageBgForcedImage)' : 'none';
                                    var bg_clr = '';
                                    bg_clr = bg_color === 'user_defined' ? custom_bg_color : bg_color;
                                    if (bg_clr == '') bg_clr = 'var(--colorBg)';
                                    body.style.setProperty('--startpageBgImage', bg_img);
                                    body.style.setProperty('--startpageBgForcedImage', final_img_path);
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
        vivaldi.prefs.onChanged.addListener(function (pref) {
            path = pref.path;
            value = pref.value;
            switch (path) {
                case 'vivaldi.startpage.background.color':
                    if (!value) value = '#cccccc';
                    if (value === 'user_defined')
                        vivaldi.prefs.get('vivaldi.startpage.background.color_custom', function (custom_color) {
                            if (!custom_color) custom_color = '#bfb8b0';
                            body.style.setProperty('--startpageBgColor', custom_color);
                        });
                    else
                        body.style.setProperty('--startpageBgColor', value);
                    break;
                case 'vivaldi.startpage.background.color_custom':
                    if (!value) value = '#bfb8b0';
                    vivaldi.prefs.get('vivaldi.startpage.background.color', function (color) {
                        if (color === 'user_defined')
                            body.style.setProperty('--startpageBgColor', value);
                    });
                    break;
                case 'vivaldi.startpage.image.enable':
                    if (value === null) value = true;
                    body.style.setProperty('--startpageBgImage', value ? 'var(--startpageBgForcedImage)' : 'none');
                    break;
                case 'vivaldi.startpage.image.path':
                    if (!value) value = './../resources/bg.jpg';
                    if (value.startsWith('./../') || value.startsWith('../')) value = value.slice(3);
                    if (value === 'user_defined')
                        vivaldi.prefs.get('vivaldi.startpage.image.path_custom', function(cust_path) {
                            if (!cust_path) cust_path = './../resources/bg.jpg';
                            if (cust_path.startsWith('./../') || cust_path.startsWith('../')) cust_path = cust_path.slice(3);
                            body.style.setProperty('--startpageBgForcedImage', 'url(\'' + cust_path + '\')');
                        });
                    else
                        body.style.setProperty('--startpageBgForcedImage', 'url(\'' + value + '\')');
                    break;
                case 'vivaldi.startpage.image.path_custom':
                    if (!value) value = './../resources/bg.jpg';
                    if (value.startsWith('./../') || value.startsWith('../')) value = value.slice(3);
                    vivaldi.prefs.get('vivaldi.startpage.image.path', function (path) {
                        if (path === 'user_defined')
                            body.style.setProperty('--startpageBgForcedImage', 'url(\'' + value + '\')');
                    });
                    break;
                case 'vivaldi.startpage.image.repeat':
                    if (value === null) value = false;
                    body.style.setProperty('--startpageBgRepeat', value ? 'repeat' : 'no-repeat');
                    break;
                case 'vivaldi.startpage.image.stretch':
                    if (value === null) value = true;
                    body.style.setProperty('--startpageBgSize', value ? 'cover' : 'auto');
                    break;
            }
        });
    }
    else setTimeout(wait, 200);
}, 200);
