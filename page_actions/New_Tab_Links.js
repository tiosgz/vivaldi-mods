document.body.addEventListener('click', function(event) {
    const target = event.target;
    do {
        if (target.nodeName.toUpperCase() === 'A' && target.href) {
            //target.href = 'javascript:'; //disables all links
            target.target = '_blank'; //opens links in new tab
            break;
        }
    } while (target = target.parentElement);
}, true);