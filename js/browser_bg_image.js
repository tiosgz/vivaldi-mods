/* Use with /css/themes_and_colors/acrylic.css */

setTimeout(function wait() {
    var body = document.body;
    var head = document.head;
    if(body && head) {
        function toggle(what, newState, noForce) {
            if (what !== 'active' && what !== 'wallpaper_mode')
                return;
            if (newState === null || newState === undefined) {
                chrome.storage.local.get({'_mods':{}}, (m) => {
                    if (m._mods.acrylic && m._mods.acrylic[what] !== undefined) {
                        toggle(what, m._mods.acrylic[what], true);
                    } else {
                        toggle(what, (what === 'active'));
                    }
                });
            } else {
                let cb = document.querySelector('#-mod-acrylic-' + what + '-setting-checkbox input');
                if (newState) {
                    body.classList.add(what === 'active' ? '-mod-acrylic' : '-mod-wallpaper-sync');
                    if (cb) {
                        cb.checked = true;
                    }
                } else {
                    body.classList.remove(what === 'active' ? '-mod-acrylic' : '-mod-wallpaper-sync');
                    if (cb) {
                        cb.checked = false;
                    }
                }
                if (!noForce) {
                    chrome.storage.local.get({'_mods':{}}, (m) => {
                        if (!m._mods.acrylic) {
                            m._mods.acrylic = {};
                        }
                        m._mods.acrylic[what] = newState ? true : false;
                        chrome.storage.local.set({'_mods':m._mods});
                    });
                }
            }
        }
        function makeCheckbox(name) {
            if (name !== 'active' && name !== 'wallpaper_mode') return;
            let group = document.querySelector('.vivaldi-settings .setting-section .settings-startpage + .setting-group > .setting-group:first-of-type');
            if (group && !document.querySelector('#-mod-acrylic-' + name + '-setting-checkbox')) {
                let d = document.createElement('div');
                d.classList.add('setting-single', '-mod-added-setting');
                d.id = '-mod-acrylic-' + name + '-setting-checkbox';
                d.innerHTML = '<label><input type="checkbox"/><span>'
                    + (name === 'active' ? 'Background Accross Whole Window' : 'Move With Window')
                    + '</span></label>';
                d.dataset.settingPath = 'storage.local:_mods.acrylic.' + name;
                let cb = d.firstElementChild.firstElementChild;
                chrome.storage.local.get({'_mods':{}}, (m) => {
                    let checked = true;
                    if (!m._mods.acrylic) {
                        m._mods.acrylic = {active:true, wallpaper_mode:false};
                        chrome.storage.local.set({'_mods':m._mods});
                    }
                    if (m._mods.acrylic[name] !== true && m._mods.acrylic[name] !== false) {
                        m._mods.acrylic[name] = (name === 'active');
                        chrome.storage.local.set({'_mods':m._mods});
                    } else {
                        checked = m._mods.acrylic[name];
                    }
                    cb.checked = checked ? true : false;
                });
                cb.addEventListener('change', () => {
                    toggle(name, cb.checked);
                });
                group.appendChild(d);
            }
        }
        body.addEventListener('click', () => setTimeout(() => makeCheckbox('active'), 50));
        body.addEventListener('click', () => setTimeout(() => makeCheckbox('wallpaper_mode'), 50));
        chrome.storage.onChanged.addListener((changes, area) => {
            if (area === 'local' && changes._mods) {
                if ((!changes._mods.oldValue && changes._mods.newValue)
                    || (changes._mods.oldValue.acrylic.active !== changes._mods.newValue.acrylic.active))
                    toggle(changes._mods.newValue.acrylic.active, true);
                if ((!changes._mods.oldValue && changes._mods.newValue)
                    || (changes._mods.oldValue.acrylic.wallpaper_mode !== changes._mods.newValue.acrylic.wallpaper_mode))
                    toggle(changes._mods.newValue.acrylic.wallpaper_mode, true);
            }
        })
        toggle('active');
        toggle('wallpaper_mode');


        function correctPath(path) {
            if (path.startsWith('./../') || path.startsWith('../')) {
                path = 'chrome-extension://mpognobbkildjkofajifpdfhcoklimli/' + path.slice(path.startsWith('./') ? 5 : 3);
            }
            return path;
        }
        vivaldi.prefs.get('vivaldi.startpage.background.color', function(bg_color) {
            if (!bg_color) bg_color = '#cccccc';
            vivaldi.prefs.get('vivaldi.startpage.background.color_custom', function(custom_bg_color) {
                if (!custom_bg_color) custom_bg_color = '#bfb8b0';
                vivaldi.prefs.get('vivaldi.startpage.image.enable', function(show_img) {
                    if (show_img === null) show_img = true;
                    vivaldi.prefs.get('vivaldi.startpage.image.path', function(img_path) {
                        if (!img_path) img_path = './../resources/bg.jpg';
                        img_path = correctPath(img_path);
                        vivaldi.prefs.get('vivaldi.startpage.image.path_custom', function(custom_img) {
                            if (!custom_img) custom_img = './../resources/bg.jpg';
                            custom_img = correctPath(custom_img);
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
                    value = correctPath(value);
                    if (value === 'user_defined')
                        vivaldi.prefs.get('vivaldi.startpage.image.path_custom', function(cust_path) {
                            if (!cust_path) cust_path = './../resources/bg.jpg';
                            cust_path = correctPath(cust_path);
                            body.style.setProperty('--startpageBgForcedImage', 'url(\'' + cust_path + '\')');
                        });
                    else
                        body.style.setProperty('--startpageBgForcedImage', 'url(\'' + value + '\')');
                    break;
                case 'vivaldi.startpage.image.path_custom':
                    if (!value) value = './../resources/bg.jpg';
                    value = correctPath(value);
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
