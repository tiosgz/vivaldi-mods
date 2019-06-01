setTimeout(function wait() {
    var browser = document.querySelector('#browser');
    if(browser) {
        chrome.storage.local.get({
            'STARTPAGE_SHOW_IMAGE': false,
            'STARTPAGE_BG_COLOR': '',
            'STARTPAGE_BG_COLOR_USER_DEFINED': '#bfb8b0',
            'STARTPAGE_IMAGE': '',
            'STARTPAGE_IMAGE_USER_DEFINED': '',
            'STARTPAGE_IMAGE_REPEAT': false,
            'STARTPAGE_IMAGE_STRETCH': true
        }, function(data) {
            var bgImg = '';
            var bgClr = '';
            if(data.STARTPAGE_SHOW_IMAGE)
                bgImg = data.STARTPAGE_IMAGE === 'user_defined' ? 'url(\'' + data.STARTPAGE_IMAGE_USER_DEFINED + '\')' : 'url(\'' + data.STARTPAGE_IMAGE + '\')';
            bgClr = data.STARTPAGE_BG_COLOR === 'user_defined' ? data.STARTPAGE_BG_COLOR_USER_DEFINED : data.STARTPAGE_BG_COLOR;
            if(bgClr === '') bgClr = 'var(--colorBg)';
            var bg = bgImg + bgClr;
            browser.style.background = bg;
            if(data.STARTPAGE_IMAGE_REPEAT)
                browser.style.backgroundRepeat = 'repeat';
            else
                browser.style.backgroundRepeat = 'no-repeat';
            if(data.STARTPAGE_IMAGE_STRETCH)
                browser.style.backgroundSize = 'cover';
            else
                browser.style.backgroundSize = 'auto';
        });
    }
    else setTimeout(wait, 200);
}, 200);