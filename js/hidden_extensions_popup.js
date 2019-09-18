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
        let order = [];

        function getId(button) {
            if (!button) return null;
            let id = null;
            button.classList.forEach((cls) => {
                if ((/^[a-z]{32}$/).test(cls)) {
                    id = cls;
                }
            });
            return id;
        }

        function nextButton(extId) {
            if (order.includes(extId)) {
                for (let i = order.indexOf(extId); i < order.length; i++) {
                    let btn = extBar.querySelector('.mod-extensions-buttons-popup .button-toolbar.' + order[i]);
                    if (btn)
                        return btn;
                }
                return null;
            } else {
                return null;
            }
        }

        function makePopup() {
            vivaldi.prefs.get('vivaldi.address_bar.extensions.visible', (hideExts) => {
                if (!hideExts) {
                    removePopup();
                    let popup = document.createElement('div');
                    popup.classList.add('mod-extensions-buttons-popup', 'toolbar', 'toolbar-mainbar', 'toolbar-large');
                    let extButtons = extBar.querySelectorAll(extBtnSelector);
                    extButtons.forEach(function(button) {
                        button.parentElement.removeChild(button);
                        popup.appendChild(button);
                    });
                    extBar.appendChild(popup);
                } else {
                    moveOutside()
                    removePopup();
                }
            });
        }

        function moveToPopup() {
            if (extBar.querySelector('.mod-extensions-buttons-popup')) {
                let extButtons = extBar.querySelectorAll(extBtnSelector);
                let popup = extBar.querySelector('.mod-extensions-buttons-popup');
                extButtons.forEach(function(button) {
                    if (button.parentElement !== popup) {
                        button.parentElement.removeChild(button);
                        if (nextButton(getId(button))) {
                            popup.insertBefore(button, nextButton(getId(button)));
                        } else {
                            popup.appendChild(button);
                        }
                    }
                });
            } else {
                makePopup();
            }
        }

        function moveOutside() {
            let popup = extBar.querySelector('.mod-extensions-buttons-popup');
            if (popup) {
                let moveBefore = extBar.querySelector('.button-toolbar.button-narrow');
                if (!moveBefore)
                    moveBefore = extBar.querySelector('.extension-popup');
                while (popup.firstElementChild) {
                    let btn = popup.firstElementChild;
                    popup.removeChild(btn);
                    if (moveBefore)
                        extBar.insertBefore(btn, moveBefore);
                    else
                        extBar.appendChild(btn);
                }
            }
        }

        function removePopup() {
            let popup = extBar.querySelector('.mod-extensions-buttons-popup');
            if (popup) {
                if (popup.childElementCount) {
                    console.log('Warning: Removing non-empty popup!');
                    console.log(popup.children);
                }
                popup.parentElement.removeChild(popup);
            }
        }

        function checkChange(pref) {
            if (pref.path === 'vivaldi.address_bar.extensions.visible'){
                makePopup();
            } else if (pref.path === 'vivaldi.address_bar.extensions.show_toggle') {
                extBtnSelector = '.button-toolbar:not(.button-narrow)';
                if (!pref.value)
                    extBtnSelector += '.button-temporarily-visible';
                makePopup();
            }
        }

        function updateSelector() {
            vivaldi.prefs.get('vivaldi.address_bar.extensions.show_toggle', (toggle) => {
                extBtnSelector = '.button-toolbar:not(.button-narrow)';
                if (!toggle)
                    extBtnSelector += '.button-temporarily-visible';
            });
        }

        function updateOrder(changes, area) {
            if (changes && area) {
                if (area === 'local' && Object.keys(changes).includes('EXTENSION_BUTTON_ORDER_BROWSER')) {
                    order = changes['EXTENSION_BUTTON_ORDER_BROWSER'].newValue;
                    moveToPopup();
                }
            } else {
                chrome.storage.local.get({'EXTENSION_BUTTON_ORDER_BROWSER': []}, (s) => {
                    order = s.EXTENSION_BUTTON_ORDER_BROWSER;
                    moveToPopup();
                });
            }
        }

        // Do not crash, please
        var removeChild = Element.prototype.removeChild;
        Element.prototype.removeChild = function() {
            if (arguments[0].tagName === 'DIV' && arguments[0].classList.contains('button-toolbar')) {
                /*let isExtBtn = false;
                let extId = '';
                arguments[0].classList.forEach((cls) => {
                    if ((/^[a-z]{32}$/).test(cls)) {
                        isExtBtn = true;
                        extId = cls;
                    }
                });*/
                let extId = getId(arguments[0]);
                if (extId)
                    document.querySelector('.button-toolbar.' + extId).remove();
                else
                    return removeChild.apply(this, arguments);
            } else {
                return removeChild.apply(this, arguments);
            }
        }
        var insertBefore = Element.prototype.insertBefore;
        Element.prototype.insertBefore = function() {
            if (arguments[0].tagName === 'DIV' && arguments[0].classList.contains('button-toolbar') &&
                arguments[1].tagName === 'DIV' && arguments[1].classList.contains('button-toolbar')) {
                let fstId = getId(arguments[0]);
                let sndId = getId(arguments[1]);
                if (fstId && sndId)
                    return insertBefore.apply(arguments[1].parentElement, arguments);
                else
                    return insertBefore.apply(this, arguments);
            } else {
                return insertBefore.apply(this, arguments);
            }
        }

        vivaldi.prefs.onChanged.addListener(checkChange);
        chrome.storage.onChanged.addListener(updateOrder);
        updateSelector();
        updateOrder();
        addCss();
        makePopup();
    }
    setTimeout(function wait() {
        let extBar = document.querySelector('.toolbar-addressbar .toolbar-extensions');
        if (extBar)
            doMod();
        else
            setTimeout(wait, 300);
    }, 300);
})();
