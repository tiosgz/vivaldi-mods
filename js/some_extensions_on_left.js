(function() {
    const EXTENSION_IDS = ['clngdbkpkpeebahjckkjfobafhncgmne', 'ocnnkbkgifhmghojdecmggabfcnidcbi', 'mefgmmbdailogpfhfblcnnjfmnpnmdfa'];

    function addCss() {
        if (!document.querySelector('style#mod-style-extensions-buttons-popup')) {
            let style = document.createElement('style');
            style.id = 'mod-style-extensions-buttons-popup';
            style.innerHTML = `
                .mod-left-toolbar-extensions.mod-left-toolbar-extensions.mod-left-toolbar-extensions .button-toolbar > button > img {
                    width: 16px;
                    height: 16px;
                    flex-basis: 16px;
                }
                .extension-popup[style*="left: -"] {
                    left: 0 !important;
                }
                .mod-left-toolbar-extensions .button-badge {
                  text-shadow: 0 1px rgba(0, 0, 0, 0.5);
                  box-shadow: 0 1px rgba(0, 0, 0, 0.5);
                  color: #fff;
                }
            `;
            document.head.appendChild(style);
        }
    }

    function doMod() {
        const extBar = () => document.querySelector('.toolbar-addressbar .toolbar-extensions');
        const addressBar = () => document.querySelector('.toolbar-addressbar');
        const addressField = () => document.querySelector('.toolbar-addressbar .addressfield');
        const extBtnSelector = '.button-toolbar:not(.button-narrow)';
        let order = [];
        let makingToolbar = false;

        const removeChild = Element.prototype.removeChild;
        const insertBefore = Element.prototype.insertBefore;
        const appendChild = Element.prototype.appendChild;

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

        function nextButton(extId, parent) {
            if (order.includes(extId)) {
                if (!parent) parent = extBar();
                for (let i = order.indexOf(extId); i < order.length; i++) {
                    let btn = parent.querySelector('.button-toolbar.' + order[i]);
                    if (btn && btn.parentElement === parent)
                        return btn;
                }
                return null;
            } else {
                return null;
            }
        }

        function makeToolbar() {
            if (!document.querySelector('.mod-left-toolbar-extensions') && !makingToolbar) {
                makingToolbar = true;
                let toolbar = document.createElement('div');
                toolbar.classList.add('mod-left-toolbar-extensions', 'toolbar', 'toolbar-mainbar', 'toolbar-large');
                let extButtons = extBar().querySelectorAll(extBtnSelector);
                extButtons.forEach(function(button) {
                    if (EXTENSION_IDS.includes(getId(button))) {
                        button.parentElement.removeChild(button);
                        appendChild.apply(toolbar, [button]);
                    }
                });
                insertBefore.apply(addressBar(), [toolbar, addressField()]);
                makingToolbar = false;
            }
        }

        function moveToToolbar(id) {
            if (addressBar().querySelector('.mod-left-toolbar-extensions')) {
                let extButtons = [];
                if (id)
                    extButtons = [extBar().querySelector('.button-toolbar.' + id)];
                else {
                    extButtons = Array.from(extBar().querySelectorAll(extBtnSelector));
                    extButtons = extButtons.filter((btn) => EXTENSION_IDS.includes(getId(btn)));;
                }
                let toolbar = addressBar().querySelector('.mod-left-toolbar-extensions');
                extButtons.forEach(function(button) {
                    if (button && button.parentElement !== toolbar) {
                        button.parentElement.removeChild(button);
                        if (nextButton(getId(button), toolbar)) {
                            insertBefore.apply(toolbar, [button, nextButton(getId(button), toolbar)]);
                        } else {
                            appendChild.apply(toolbar, [button]);
                        }
                    }
                });
            } else {
                makeToolbar();
            }
        }

        function removeToolbar() {
            let toolbar = extBar().querySelector('.mod-left-toolbar-extensions');
            if (toolbar) {
                if (toolbar.childElementCount) {
                    console.log('Warning: Removing non-empty toolbar!');
                    console.log(toolbar.children);
                }
                removeChild.apply(toolbar.parentElement, toolbar);
            }
        }

        function checkPrefsChange(pref) {
            if (pref.path === 'vivaldi.address_bar.extensions.visible'
                || pref.path === 'vivaldi.address_bar.extensions.show_toggle'){
                EXTENSION_IDS.forEach(moveToToolbar);
            }
        }

        function updateOrder(changes, area) {
            if (changes && area) {
                if (area === 'local' && Object.keys(changes).includes('EXTENSION_BUTTON_ORDER_BROWSER')) {
                    order = changes['EXTENSION_BUTTON_ORDER_BROWSER'].newValue;
                    // moveToToolbar();
                }
            } else {
                chrome.storage.local.get({'EXTENSION_BUTTON_ORDER_BROWSER': []}, (s) => {
                    order = s.EXTENSION_BUTTON_ORDER_BROWSER;
                    // moveToToolbar();
                });
            }
        }

        // Do not crash, please
        Element.prototype.removeChild = function() {
            if (arguments[0].tagName === 'DIV' && arguments[0].classList.contains('button-toolbar')) {
                let extId = getId(arguments[0]);
                if (extId)
                    document.querySelector('.button-toolbar.' + extId).remove();
                else
                    return removeChild.apply(this, arguments);
            } else {
                return removeChild.apply(this, arguments);
            }
        }
        Element.prototype.insertBefore = function() {
            if (arguments[0].tagName === 'DIV' && arguments[0].classList.contains('button-toolbar') &&
                arguments[1].tagName === 'DIV' && arguments[1].classList.contains('button-toolbar')) {
                let fstId = getId(arguments[0]);
                let sndId = getId(arguments[1]);
                let nextBtn = nextButton(fstId, this);
                let oldButton = addressBar().querySelector('.button-toolbar.' + fstId);
                if (oldButton)
                    oldButton.parentElement.removeChild(oldButton);
                if (fstId && nextBtn)
                    return insertBefore.apply(nextBtn.parentElement, [arguments[0], nextBtn]);
                else if (fstId) {
                    makeToolbar();
                    let parent = EXTENSION_IDS.includes(fstId) ? addressBar().querySelector('.mod-left-toolbar-extensions') : extBar();
                    if (!parent)
                        parent = extBar();
                    return Element.prototype.appendChild.apply(parent, [arguments[0]]);
                } else
                    return insertBefore.apply(this, arguments);
            } else {
                return insertBefore.apply(this, arguments);
            }
        }
        Element.prototype.appendChild = function() {
            if (arguments[0].tagName === 'DIV' && arguments[0].classList.contains('button-toolbar')) {
                let id = getId(arguments[0]);
                if (id) {
                    let oldButton = addressBar().querySelector('.button-toolbar.' + id);
                    if (oldButton)
                        oldButton.parentElement.removeChild(oldButton);
                    makeToolbar();
                    let parent = EXTENSION_IDS.includes(id) ? addressBar().querySelector('.mod-left-toolbar-extensions') : extBar();
                    if (!parent)
                        parent = extBar();
                    return appendChild.apply(parent, arguments);
                } else {
                    return appendChild.apply(this, arguments);
                }
            } else {
                return appendChild.apply(this, arguments);
            }
        }

        vivaldi.prefs.onChanged.addListener(checkPrefsChange);
        chrome.storage.onChanged.addListener(updateOrder);
        updateOrder();
        addCss();
        makeToolbar();
    }
    setTimeout(function wait() {
        let extBar = document.querySelector('.toolbar-addressbar .toolbar-extensions');
        if (extBar)
            doMod();
        else
            setTimeout(wait, 300);
    }, 300);
})();
