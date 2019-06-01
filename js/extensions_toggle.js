function extensionToggle() {

// Add extension IDs of buttons you want to keep permanently visible to the array. Remove example IDs.

    var selectIDs =
        [
        'ffhafkagcdhnhamiaecajogjcfgienom'
        ];

// Add extension IDs of buttons you want to hide to the array. Remove example IDs.

    var hideIDs =
        [
        'ggolfgbegefeeoocgjbmkembbncoadlb'
        ];

    // create the button
    const adr = document.querySelector('.toolbar-addressbar');
    var div = document.createElement('div');
    div.classList.add('button-toolbar', 'button-narrow');
    div.id = 'togglemod';
    div.innerHTML = '<button title="Toggle extensions" class=""><svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M13 9C14.1046 9 15 8.10457 15 7C15 5.89543 14.1046 5 13 5C11.8954 5 11 5.89543 11 7C11 8.10457 11.8954 9 13 9Z"></path><path d="M13 15C14.1046 15 15 14.1046 15 13C15 11.8954 14.1046 11 13 11C11.8954 11 11 11.8954 11 13C11 14.1046 11.8954 15 13 15Z"></path><path d="M15 19C15 20.1046 14.1046 21 13 21C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17C14.1046 17 15 17.8954 15 19Z"></path></svg></button>';
    adr.appendChild(div);

    // startup setting
    const startup = document.querySelectorAll('.toolbar-extensions div');
    const togstat = document.getElementById('togglemod');
    for (var i=0; i < startup.length; i++) {
        if (selectIDs.indexOf(startup[i].classList.item(1)) != -1) {
            startup[i].style.display = 'flex';
        }
        else {
            startup[i].style.display = 'none';
        }
    }

    // toggle logic
    togstat.addEventListener('click', function() {
        const buttons = document.querySelectorAll('.toolbar-extensions div');
        if (togstat.classList.contains('expanded')) {
            togstat.classList.remove('expanded');
        }
        else {
            togstat.classList.add('expanded');
        }
        for (var i=0; i < buttons.length; i++) {
            if (hideIDs.indexOf(buttons[i].classList.item(1)) != -1) {
                buttons[i].style.display = 'none';
            }
            else if (selectIDs.indexOf(buttons[i].classList.item(1)) != -1 || togstat.classList.contains('expanded')) {
                buttons[i].style.display = 'flex';
            }
            else {
                buttons[i].style.display = 'none';
            }
        }
    });
};

// Loop waiting for the browser to load the UI. You can call all functions from just one instance.

setTimeout(function wait() {
    const browser = document.getElementById('browser');
    if (browser) {
        extensionToggle();
    }
    else {
        setTimeout(wait, 300);
    }
}, 300);
