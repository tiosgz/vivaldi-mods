/* Use with /css/minimalist/navigation_toolbar_toggle.css */

(function(){
    function toggleToolbar() {
        let toolbar = document.querySelector('.toolbar-addressbar.toolbar > .toolbar.toolbar-droptarget.toolbar-mainbar');
        if (toolbar) toolbar.classList.toggle('mod-addressbar-toolbar-collapsed');
    }
    
    function addButtonsClass() {
        let divs = document.querySelectorAll('.toolbar-addressbar.toolbar > .toolbar.toolbar-droptarget.toolbar-mainbar > div');
        divs.forEach(div => {
            let title = div.title;
            if (title == null || title == '')
                title = div.firstElementChild.title;
            title = title.toLowerCase();
            if (title != 'reload current page' && title != 'toggle navigation buttons') {
                div.classList.add('collapsible');
            }
        });
    }

    function toolbarToggleButton() {
        // toolbar toolbar-droptarget toolbar-mainbar toolbar-large
        let toolbar = document.querySelector('.toolbar-addressbar.toolbar > .toolbar.toolbar-droptarget.toolbar-mainbar');
        let outer_div = document.createElement('div');
        outer_div.classList.add('button-toolbar');
        outer_div.title = 'Toggle navigation buttons';
        let toggle_button = document.createElement('button');
        toggle_button.classList.add('mod-addressbar-toolbar-toggle', 'button-toolbar');
        toggle_button.onclick = toggleToolbar;
        // xmlns="http://www.w3.org/2000/svg"
        toggle_button.innerHTML = '<svg viewBox="0 0 5 10"><path d="M0 0h0.5l3.5 3.5v1l-3.5 3.5h-0.5v-0.5l3.5 -3.5, -3.5 -3.5v-0.5z"/></svg>';
        outer_div.appendChild(toggle_button);
        toolbar.appendChild(outer_div);
        if (!toolbar.classList.contains('mod-addressbar-toolbar-collapsed')) toolbar.classList.add('mod-addressbar-toolbar-collapsed');
        addButtonsClass();
    }

    setTimeout(function wait() {
        let toolbar = document.querySelector('.toolbar-addressbar.toolbar > .toolbar.toolbar-droptarget.toolbar-mainbar');
        if (toolbar) {
            toolbarToggleButton();
            setTimeout(addButtonsClass, 300);
            vivaldi.prefs.onChanged.addListener((pref) => {
                if (pref.path === 'vivaldi.toolbars.navigation')
                    addButtonsClass();
            });
        }
        else {
            setTimeout(wait, 300);
        }
    }, 300);
})();