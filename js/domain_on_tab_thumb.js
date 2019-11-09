/* Use with /css/tabs/domain_on_tab_thumb.css */

var DEBUG = false;

(function observeTopNodeWhenExists() {
    var topNode = document.querySelector('#vivaldi-tooltip');
    if (topNode === null) {
        setTimeout(observeTopNodeWhenExists, 300);
        return;
    }
    observer.observe(topNode, {
        characterData: false,
        attributes: false,
        childList: true,
        subtree: true
    });
})();

var observer = new MutationObserver(
    function (mutations) {
        mutations.forEach(function (mutation) {
            DEBUG && console.log('MUTATION', mutation.type);
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach(function (node) {
                    DEBUG && console.log('ADDED NODE:', node.classList.toString(), node);
                    if (node.classList.contains('tooltip-item') || node.classList.contains('tooltip')) {
                        showUrlOnThumbnail(node.querySelector('.thumbnail-text'));
                    }
                });
            }
        });
    }
);

function showUrlOnThumbnail(target_tab_title) {
    if (target_tab_title == null) {
        return;
    }

    // Skip if there is no thumbnail (current single tab)
    if(!target_tab_title.parentElement.parentElement.querySelector('.thumbnail-image')) {
        return;
    }

    var data = getUrlOfThumbnail(target_tab_title);

    // Skip speed dial, settings and other internal pages.
    if (data.url.startsWith('chrome')) {
        return;
    }

    target_tab_title.parentElement.parentElement.appendChild(createUrlOverlay(data));
}

function getUrlOfThumbnail(target_tab_title) {
    var tab_element = null;
    document.querySelector('#tabs-container').querySelectorAll('.tab-header .title').forEach(function (tab_title) {
        if (tab_title.innerText == target_tab_title.innerText) {
            tab_element = tab_title.parentElement.parentElement;
        }
    });

    var tab_id = tab_element.id.replace('tab-', '');
    DEBUG && console.log('TAB ID OF THUMBNAIL:', tab_id);

    var data = {
        'url': document.getElementById(tab_id).src,
        'favicon': tab_element.querySelector('.favicon'),
    }
    DEBUG && console.log('DATA:', data);
    return data;
}

function createUrlOverlay(data) {
    var urlPretty = data.url.replace(/.*:\/\/(www\.)?/, '').replace(/\/.*/, '').toUpperCase();
    var urlParts = urlPretty.split(':')
    var portNumber = urlParts[1] ? ':' + urlParts[1] : '';
    var urlParts = urlParts[0].split('.');
    var nbsp = '\xa0';
    switch (urlParts.length) {
        case 2:
            return formatContent(data.favicon, nbsp, urlParts[0], '.' + urlParts[1] + portNumber);
        case 3:
            return formatContent(data.favicon, urlParts[0] + '.', urlParts[1], '.' + urlParts[2] + portNumber);
        default:
            return formatContent(data.favicon, nbsp, urlParts.join('.'), nbsp + portNumber);
    }
}

function formatContent(favicon, top, middle, bottom) {
    var overlayContainer = createOverlay('', 'thumbnail-url-overlay');
    var alignmentContainer = createOverlay('', 'thumbnail-url-alignment');

    alignmentContainer.appendChild(createFaviconOverlay(favicon));
    alignmentContainer.appendChild(createOverlay(top, 'top'));
    alignmentContainer.appendChild(createOverlay(middle, 'middle'));
    alignmentContainer.appendChild(createOverlay(bottom, 'bottom'));

    overlayContainer.appendChild(alignmentContainer);
    return overlayContainer;
}

function createOverlay(text, cssClass) {
    var overlay = document.createElement('div');
    overlay.classList += cssClass;
    overlay.textContent = text;
    return overlay;
}

function createFaviconOverlay(favicon) {
    var faviconOverlay = document.createElement('img');
    if(favicon.srcset) {
        faviconOverlay.srcset = favicon.srcset;
    }
    faviconOverlay.width = 32;
    faviconOverlay.height = 32;
    return faviconOverlay;
}