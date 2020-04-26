// This mod changes the spacing of tree-view items
// It is very likely to break the visible result, so you may need to use
// additional CSS to change the size of the items' children
//
// Right now it works only for the bookmarks panel, but with some edits you
// should be able to use it for any tree

(function() {
    let reactKey = undefined;
    const treeSelector = '.panel-bookmarks .vivaldi-tree > .ReactVirtualized__Grid.ReactVirtualized__List';

    function getReactKey() {
        let browser = document.querySelector('#browser');
        // I hope the #browser is loaded every time, but...
        if (browser) {
            for (let key in browser) {
                if (key.startsWith('__react')) {
                    reactKey = key.substring(key.indexOf('$'));
                    break;
                }
            }
        }
    }
    function changeItemsHeight() {
        // We can't use the internal things if we don't have the React key
        if (!reactKey) {
            console.error('Cannot use internal React objects: React key not found');
            return;
        }
        let treeView = document.querySelector(treeSelector);
        if (treeView) {
            let reactInstance = treeView['__reactInternalInstance' + reactKey];
            if (reactInstance) {
                // Here happens the change of the item spacing
                if (reactInstance.memoizedProps.children[0]) {
                    reactInstance.memoizedProps.children[0].
                        _owner.memoizedProps.rowHeight = 16;
                } else {
                    let timesTried = 0;
                    setTimeout(function waitForItems() {
                        if (reactInstance.memoizedProps.children[0]) {
                            reactInstance.memoizedProps.children[0].
                                _owner.memoizedProps.rowHeight = 16;
                        } else if (timesTried < 25) {
                            setTimeout(waitForItems, 300);
                            timesTried++;
                        }
                    }, 300);
                }
                // TODO: force the tree reload
            }
        }
    }
    function panelChangeListener(change) {
        if (change.hasOwnProperty('PANEL_STATE')
            && change.PANEL_STATE.hasOwnProperty('newValue')) {
            const psNow = change.PANEL_STATE.newValue;
            if (psNow.panelVisible
                && psNow.selectedPanel == 'bookmarks') {
                changeItemsHeight();
            }
        } else if (change.hasOwnProperty('EXPAND_BOOKMARKS_PANEL')) {
            changeItemsHeight();
        }
    }

    // Actually do the work
    setTimeout(function waitForKey() {
        let browser = document.querySelector('#browser');
        if (browser) {
            getReactKey();
        } else {
            setTimeout(waitForKey, 300);
        }
    }, 300);
    chrome.storage.local.onChanged.addListener(panelChangeListener);
    // If the panel is open, we need to change it right now
    chrome.storage.local.get({PANEL_STATE: {}}, storage => {
        if (storage.PANEL_STATE.panelVisible
            && storage.PANEL_STATE.selectedPanel == 'bookmarks') {
            let timesTried = 0;
            setTimeout(function waitForGrid() {
                let tree = document.querySelector(treeSelector);
                if (tree) {
                    changeItemsHeight();
                } else if (timesTried < 25) {
                    setTimeout(waitForGrid, 300);
                    timesTried++;
                }
            }, 300);
        }
    });
})();
