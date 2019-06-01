setTimeout(function wait(){
    var panel = document.querySelector('#panels-container #switch');
    if(panel){
        var container = document.createElement('div');
        container.setAttribute('id', 'icons-container');
        var icons = document.querySelectorAll('#panels-container #switch > button:not(.preferences)');
        for(var i = 0; i < icons.length; i++){
            var old_icon = icons.item(i);
            var new_icon = old_icon.cloneNode(true);
            panel.removeChild(old_icon);
            container.appendChild(new_icon);
        };
        var add = document.querySelector('#panels-container #switch .addwebpanel-wrapper');
        panel.insertBefore(container, add);
    }
    else setTimeout(wait, 300);
}, 300);