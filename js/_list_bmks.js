(function() {
    chrome.bookmarks.getTree(b => {
        main = b[0].children.filter(c => c.children.length > 0)[0];
        console.log(main);
        function convert(s) {
            let t = {};
            t.type =
                (s.children && s.children.constructor === Array) ? 'folder'
                : (s.description === 'separator'
                    && s.url === 'http://bookmark.placeholder.url/'
                    && s.title === '---') ? 'separator' : 'link';
            if (t.type !== 'separator')
                t.name = s.title;
            if (t.type === 'folder') {
                t.hasChildren = (s.children.length > 0);
                t.children = [];
                s.children.forEach(c => { t.children.push(convert(c)); });
            } else if (t.type === 'link') {
                t.url = s.url;
            }
            return t;
        }
        console.log(convert(main));
    });
})();
