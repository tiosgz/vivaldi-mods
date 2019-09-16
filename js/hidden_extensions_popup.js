(function() {
    function addCss() {
        if (!document.querySelector('style#mod-style-extensions-buttons-popup')) {
            let style = document.createElement('style');
            style.id = 'mod-style-extensions-buttons-popup';
            style.innerHTML = `
                .mod-extensions-buttons-popup {
                    background-color: var(--colorBg);
                    position: absolute;
                    top: 34px;
                    right: 0;
                    /* Now is fixed-width to not collapse to 2 cols */
                    width: 204px;
                    flex-wrap: wrap;
                }
            `;
            document.head.appendChild(style);
        }
    }

    function doMod() {
        const extBar = document.querySelector('.toolbar-addressbar .toolbar-extensions');
        let extBtnSelector = '.button-toolbar:not(.button-narrow).button-temporarily-visible';

        function makePopup() {
            let popup = document.createElement('div');
            popup.classList.add('mod-extensions-buttons-popup', 'toolbar', 'toolbar-mainbar', 'toolbar-large');
            let extButtons = extBar.querySelectorAll(extBtnSelector);
            extButtons.forEach(function(button) {
                button.parentElement.removeChild(button);
                popup.appendChild(button);
            });
            extBar.appendChild(popup);
        }

        function checkChange(pref) {
            if (pref.path === 'vivaldi.address_bar.extensions.visible'){
                // I don't know why, but they are visible when it's false :-P
                if (pref.value === false) {
                    // In fact they are shown
                    makePopup();
                } else {
                    let popup = extBar.querySelector('.mod-extensions-buttons-popup');
                    if (popup)
                        popup.parentElement.removeChild(popup);
                }
            } else if (pref.path === 'vivaldi.address_bar.extensions.show_toggle') {
                extBtnSelector = '.button-toolbar:not(.button-narrow)';
                if (!pref.value)
                    extBtnSelector += '.button-temporarily-visible';
            }
        }

        // Do not crash, please
        var removeChild = Element.prototype.removeChild;
        Element.prototype.removeChild = function() {
            if (arguments[0].tagName === 'DIV' && arguments[0].classList.contains('button-toolbar')) {
                let isExtBtn = false;
                let extId = '';
                arguments[0].classList.forEach((cls) => {
                    if ((/^[a-z]{32}$/).test(cls)) {
                        isExtBtn = true;
                        extId = cls;
                    }
                });
                if (isExtBtn)
                    document.querySelector('.button-toolbar.' + extId).remove();
            } else {
                return removeChild.apply(this, arguments);
            }
        }

        vivaldi.prefs.onChanged.addListener(checkChange);

        addCss();
    }
    setTimeout(function wait() {
        let extBar = document.querySelector('.toolbar-addressbar .toolbar-extensions');
        if (extBar)
            doMod();
        else
            setTimeout(wait, 300);
    }, 300);
})();
