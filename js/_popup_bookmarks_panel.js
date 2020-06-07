function getType(bmk) {
    if (bmk.url === 'http://bookmark.placeholder.url/'
        && bmk.title === '---'
        && bmk.description === 'separator')
        return 'separator';
    else if (bmk.children && bmk.children.constructor === Array
             || !bmk.url)
        return 'folder';
    return 'link';
}

function toggleExpand(folderNode) {
    if (folderNode.classList.contains('expandable')) {
        if (folderNode.classList.contains('expanded')) {
            let content = folderNode.querySelector('.children');
            folderNode.classList.remove('expanded');
            content.remove();
            folderNode.classList.add('collapsed');
        } else {
            chrome.bookmarks.getSubTree(folderNode.dataset.id, subtree => {
                folderNode.classList.remove('collapsed');
                let ul = document.createElement('ul');
                ul.classList.add('children');
                folderNode.appendChild(ul);
                subtree[0].children.forEach(c => {
                    ul.appendChild(getTree(c));
                });
                folderNode.classList.add('expanded');
            });
        }
    }
}

function getTree(bmk) {
    let type = getType(bmk);
    let root = document.createElement('li');
    root.classList.add('tree-row', type);
    root.dataset.id = bmk.id;
    root.dataset.type = type;
    if (type !== 'separator') {
        let header = document.createElement('div');
        header.classList.add('item-header');
        root.appendChild(header);
        let iconContainer = document.createElement('span');
        iconContainer.classList.add('icon');
        header.appendChild(iconContainer);
        let title = document.createElement('span');
        title.classList.add('title');
        title.innerHTML = bmk.title;
        header.appendChild(title);
        if (type === 'link') {
            let url = document.createElement('span');
            url.classList.add('url');
            url.innerHTML = bmk.url;
            header.appendChild(url);
        } else if (bmk.children.length > 0) {
            root.classList.add('expandable', 'collapsed');
            header.addEventListener('click', () => toggleExpand(root));
        }
    }
    return root;
}


let button = document.createElement('button');
button.classList.add('mod-button-test');
button.innerHTML = '<svg viewBox="0 0 26 26"><path d="M17.75 3.94c-2.103 0-3.911 1.71-4.75 3.496-0.839-1.786-2.649-3.496-4.75-3.496-2.899 0-5.25 2.353-5.25 5.25 0 5.896 5.947 7.441 10 13.27 3.831-5.793 10-7.563 10-13.27 0-2.899-2.353-5.25-5.25-5.25z" /></svg>';
//M5 5h4v12h8v-12h4v16h-16v-16z
//M10.325 0.875c-1.472 0-2.738 1.197-3.325 2.447-0.587-1.25-1.854-2.447-3.325-2.447-2.029 0-3.675 1.647-3.675 3.675 0 4.127 4.163 5.209 7 9.289 2.682-4.055 7-5.294 7-9.289 0-2.029-1.647-3.675-3.675-3.675z
let div = document.createElement('div');
div.classList.add('button-toolbar');
div.appendChild(button);
let ab = document.querySelector('.toolbar-addressbar');
let mkContents = () => {
    let d = document.createElement('div');
    d.style.height = '500px';
    d.style.width = '500px';
    let ul = document.createElement('ul');
    d.appendChild(ul);
    chrome.bookmarks.getTree(b => {
        let childBmks = b[0].children.filter(c => c.children.length > 0)[0].children;
        childBmks.forEach(c => {
            ul.appendChild(getTree(c));
        });
    });
    return d;
};
let mgr = new ModPopupButtonsManager(div, ab, null, mkContents, 'mod-test');
