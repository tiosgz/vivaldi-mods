(function () {
    function doMod() {
        let isModEnabled = false;
        const tabBar = document.querySelector('#tabs-container');

        function scrollToTab(tabInfo) {
            if (isModEnabled) {
                let tab;
                if (tabInfo && tabInfo.tabId)
                    tab = document.querySelector('#tab-' + tabInfo.tabId);
                else
                    tab = document.querySelector('#tabs-container .tab-strip .tab.active');
                if (tab)
                    tab.scrollIntoViewIfNeeded();
            }
        }

        function checkIsModEnabled() {
            vivaldi.prefs.get('vivaldi.tabs.visible', function(tabsVisible){
                if (tabsVisible)
                    vivaldi.prefs.get('vivaldi.tabs.bar.position', function(barPosition){
                        if (barPosition === 'left' || barPosition === 'right' || barPosition === 1 || barPosition === 2)
                            isModEnabled = true;
                        else
                            isModEnabled = false;
                    });
                else
                    isModEnabled = false;
            });
        }

        checkIsModEnabled();
        vivaldi.prefs.onChanged.addListener(function(pref){
            if (pref.path === 'vivaldi.tabs.visible' || pref.path === 'vivaldi.tabs.bar.position')
                checkIsModEnabled();
        });
        chrome.tabs.onActivated.addListener(scrollToTab);
        tabBar.addEventListener('mouseleave', scrollToTab);
    }

    setTimeout(function wait() {
        let activeTab = document.querySelector('#tabs-container .tab-strip .tab.active');
        if (activeTab)
            doMod();
        else
            setTimeout(wait, 300);
    }, 300);
})();
