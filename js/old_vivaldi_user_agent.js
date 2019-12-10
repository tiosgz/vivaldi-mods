(function () {
    const oldUA = navigator.userAgent;
    let vivVersion = '2.10.1745.1';

    function checkVersion() {
        let ver = '';
        function lastFromStorage() {
            chrome.storage.local.get({'_last_viv_version':''}, (lv) => {
                if (lv._last_viv_version.length > 0)
                    vivVersion = lv._last_viv_version;
            });
        }
        vivaldi.prefs.get('vivaldi.biscuit.version', (showVerInfo) => {
            if (showVerInfo) {
                vivaldi.prefs.get('vivaldi.toolbars.status', (showOnSB) => {
                    vivaldi.prefs.get('vivaldi.toolbars.navigation', (showOnAB) => {
                        if (showOnSB || showOnAB) {
                            setTimeout(function wait() {
                                let biscuit = document.querySelector('input.biscuit-string');
                                if (biscuit) {
                                    let bString = biscuit.value;
                                    bString = bString.slice(8);
                                    vivVersion = bString.slice(0, bString.indexOf('/') - 1);
                                } else {
                                    setTimeout(wait, 300);
                                }
                            }, 300);
                        } else {
                            lastFromStorage();
                        }
                    });
                });
            } else {
                lastFromStorage();
            }
        });
    }

    function changeUA(details) {
        if (details.requestHeaders) {
            for (var i = 0; i < details.requestHeaders.length; i++) {
                if (details.requestHeaders[i].name === 'User-Agent') {
                    details.requestHeaders.splice(i, 1);
                    break;
                }
            }
            let ua = oldUA;
            ua += ' Vivaldi/';
            ua += vivVersion;
            details.requestHeaders.push({
                name: 'User-Agent',
                value: ua
            });
            return {requestHeaders: details.requestHeaders};
        }
    }

    checkVersion();
    chrome.webRequest.onBeforeSendHeaders.addListener(changeUA, {urls: ["<all_urls>"]}, ["blocking", "requestHeaders"]);
})();
