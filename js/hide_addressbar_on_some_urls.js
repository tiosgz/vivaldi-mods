(function () {
    const HIDE_ON_URLS = [
        'https://forum.vivaldi.net/',
        'https://vivaldi.net/',
        'https://vivaldi.com/'
    ];

    function addCss() {
        let style = document.querySelector('style#mod-hide-addressbar-on-match');
        if (!style) {
            style = document.createElement('style');
            style.id = 'mod-hide-addressbar-on-match';
            style.innerHTML = `
                #browser.mod-addressbar-hide-match .toolbar.toolbar-addressbar {
                    display: none !important;
                }
            `;
            document.head.appendChild(style);
        }
    }
    function applyMod() {
        addCss();

        const browser = document.querySelector('#browser');
        const usedClass = 'mod-addressbar-hide-match';

        function testActive(tabId, changeInfo, tab) {
            chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
                let url = '';
                if (tabs.length > 0 && tabs[0].url)
                    url = tabs[0].url;
                if (url && url !== '') {
                    let matches = false;
                    HIDE_ON_URLS.forEach((hiddenUrl) => {
                        if (url.startsWith(hiddenUrl))
                            matches = true;
                    });
                    if (matches) {
                        browser.classList.add(usedClass);
                    } else {
                        browser.classList.remove(usedClass);
                    }
                }
            });
        }

        chrome.tabs.onUpdated.addListener(testActive);
        chrome.tabs.onActivated.addListener(testActive);
    }
    setTimeout(function wait() {
        let browser = document.querySelector('#browser');
        if (browser)
            applyMod();
        else
            setTimeout(wait, 300);
    }, 300);
})();
