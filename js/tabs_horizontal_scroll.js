/* This is NOT to be used with the CSS mod */

(function() {
    const minWidth = 150;
    let isModEnabled = false;
    let isScrollEnabled = false;
    function addStyle() {
        if (isModEnabled) {
            if (!document.querySelector('style#horizontal-tab-scroll-mod')) {
                let style = document.createElement('style');
                style.id = 'horizontal-tab-scroll-mod';
                style.innerHTML = `
                    .tabs-top .tab-strip,
                    .tabs-bottom .tab-strip {
                        display: flex !important;
                        flex-wrap: nowrap;
                        overflow-x: scroll;
                        overflow-y: hidden;
                    }
                    #tabs-container.top .tab-strip {
                        pointer-events: auto;
                    }
                    .tab-strip::-webkit-scrollbar {
                        height: 2px;
                        position: absolute;
                    }
                    .tab-strip::-webkit-scrollbar-button {
                        display: none;
                    }
                    .tab-strip::-webkit-scrollbar-track {
                        background-color: transparent !important;
                        border-width: 0 !important;
                    }
                    .tab-strip::-webkit-scrollbar-thumb {
                        background: var(--colorBorder) !important;
                        border-radius: var(--radius) !important;
                    }
                    .tabs-top .tab-position,
                    .tabs-bottom .tab-position {
                        position: initial !important;
                        transform: none !important;
                        display: inline-flex;
                        min-width: ` + minWidth + `px !important;
                        vertical-align: top;
                    }
                    #tabs-container.top .tab.tab-small.tab-mini .tab-header .title,
                    #tabs-container.bottom .tab.tab-small.tab-mini .tab-header .title {
                        display: flex;
                    }
                    #tabs-container.top .tab.tab-small.tab-mini .tab-header,
                    #tabs-container.bottom .tab.tab-small.tab-mini .tab-header {
                        padding-left: 6px;
                        border-left-width: 0;
                        border-right-width: 0;
                    }
                    .tabs-top .tab-strip .toolbar-tabbar,
                    .tabs-bottom .tab-strip .toolbar-tabbar {
                        display: inline-flex;
                        position: sticky;
                        right: 10px;
                        flex-shrink: 0;
                    }
                    .tabs-top.color-behind-tabs-off .tab-strip .toolbar-tabbar,
                    .tabs-bottom.color-behind-tabs-off .tab-strip .toolbar-tabbar {
                        background: radial-gradient(var(--colorBg) 0%, var(--colorBg) 50%, transparent);
                    }
                    .tabs-top.color-behind-tabs-on .tab-strip .toolbar-tabbar,
                    .tabs-bottom.color-behind-tabs-on .tab-strip .toolbar-tabbar {
                        background: radial-gradient(var(--colorAccentBg) 0%, var(--colorAccentBg) 50%, transparent);
                    }
                    .tabs-top .tab-strip .toolbar-tabbar .newtab,
                    .tabs-bottom .tab-strip .toolbar-tabbar .newtab {
                        left: unset !important;
                    }
                    .tabs-top .tab-strip .toolbar-tabbar .button-toolbar,
                    .tab-bottom .tab-strip .toolbar-tabbar .button-toolbar {
                        flex-shrink: 0;
                    }
                    #tabs-container.top .resize,
                    #tabs-container.bottom .resize {
                        width: calc(100% - 60px);
                        flex: 0 0 calc(100% - 60px) !important;
                    }
                    #tabs-container.top .sync-and-trash-container,
                    #tabs-container.bottom .sync-and-trash-container {
                        flex-grow: 1;
                    }
                    .tab-strip > span:last-of-type {
                        margin-right: 50px;
                    }
                    .tab-strip > span {
                        min-height: 30px;
                    }`;
                document.head.appendChild(style);
            }
        }
    }
    function scroll(e) {
        e.preventDefault();
        let offset = e.deltaY != 0 ? e.deltaY : e.deltaX;
        offset = offset > 0 ? 50 : -50;
        document.querySelector('.tab-strip').scrollBy(offset, 0);
    }
    function resizeTabs() {
        if (isModEnabled) {
            let tabs = document.querySelectorAll('.tab-position > .tab');
            tabs.forEach((tab) => {
                let width = parseInt(tab.parentElement.style.width);
                if (!tab.classList.contains('pinned') && width < 150)
                    tab.parentElement.style.width = minWidth.toString() + 'px';
            });
        }
        setTimeout(resizeTabs, 500);
    }
    function checkIsModEnabled() {
        vivaldi.prefs.get('vivaldi.tabs.visible', function (tabsVisible) {
            if (!tabsVisible) {
                isModEnabled = false;
                isScrollEnabled = false;
            } else {
                vivaldi.prefs.get('vivaldi.tabs.bar.position', function (barPosition) {
                    if(barPosition === 'top' || barPosition === 0 || barPosition === 'bottom' || barPosition === 3) {
                        isModEnabled = true;
                        addStyle();
                        vivaldi.prefs.get('vivaldi.mouse_wheel.tab_switch', function (mouseScrollSwitch) {
                            isScrollEnabled = mouseScrollSwitch ? false : true;
                        });
                    } else {
                        isModEnabled = false;
                        isScrollEnabled = false;
                    }
                });
            }
        });
    }
    function onPrefsChange(pref) {
        if (pref.path === 'vivaldi.tabs.visible'
            || pref.path === 'vivaldi.tabs.bar.position'
            || pref.path === 'vivaldi.mouse_wheel.tab_switch')
            checkIsModEnabled();
    }
    function scrollToActiveTab() {
        if (isModEnabled) {
            let tries = 0;
            (function scroll(){
                let tab = document.querySelector('#tabs-container .tab-strip .tab.active');
                if (tab)
                    tab.scrollIntoViewIfNeeded();
                else if (tries < 10) {
                    tries++;
                    setTimeout(scroll, 10);
                }
            })();
        }
    }
    function doMod() {
        checkIsModEnabled();
        vivaldi.prefs.onChanged.addListener(onPrefsChange);
        chrome.tabs.onActivated.addListener(scrollToActiveTab);
        document.querySelector('.tab-strip').addEventListener('wheel', scroll);
        resizeTabs();
    }
    setTimeout(function wait() {
        let activeTab = document.querySelector('#tabs-container .tab-strip .tab.active');
        if (activeTab)
            doMod();
        else
            setTimeout(wait, 300);
    }, 300);
})();
