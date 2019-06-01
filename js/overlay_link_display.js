// Create a context menu item to call on link
setTimeout(function wait(){
    if(document.getElementById('browser'))
        createContextMenuOption();
    else
        setTimeout(wait, 300);
}, 300);

// Opens a link in a dialog like display in the current visible tab
function dialogTab(linkUrl) {
    var webview = document.createElement("webview");
    var divContainer = document.createElement("div");
    webview.setAttribute("src", linkUrl);
    webview.style.width = "80%";
    webview.style.height = "85%";
    webview.style.margin = "auto";
    webview.style.overflow = "hidden";
    webview.style.borderRadius = "10px";

    webview.addEventListener("loadstart", function () {
         this.style.backgroundColor = "white";
         this.style.fontSize = "10rem";
         this.style.textAlign = "center";
         this.style.fontStyle = "grey";
         // May not be working
         this.textContent = "Loading...";
    });
    webview.addEventListener("loadstop", function () {
        this.textContent = "";
    });

    divContainer.appendChild(webview);

    divContainer.setAttribute("class", "dialog-tab");
    divContainer.style.zIndex = "1060";
    divContainer.style.position = "fixed";
    divContainer.style.top = "0";
    divContainer.style.right = "0";
    divContainer.style.bottom = "0";
    divContainer.style.left = "0";
    divContainer.style.backgroundColor = "rgba(0,0,0,.4)";

    const webpagecontainer = document.getElementsByClassName("active visible webpageview");
    webpagecontainer[0].appendChild(divContainer);

    divContainer.style.transitionProperty = "background-color";
    divContainer.style.transitionDuration = "0.1s";
    divContainer.style.transitionTimingFunction = "ease";
    divContainer.style.transitionDelay = "0s";

    divContainer.addEventListener("click", function () {
        this.remove();
    });
}

// Creates context menu item for open in dialog tab
function createContextMenuOption() {
    var option = {
        "id": "dialog-tab",
        "title": "Open Link in Dialog Tab",
        "contexts": ["link"]
    };

    chrome.contextMenus.create(option);

    chrome.contextMenus.onClicked.addListener(function (itemInfo) {
        if (itemInfo.menuItemId === "dialog-tab") {
            dialogTab(itemInfo.linkUrl);
        }
    });
}