(function() {
    function addStyle() {
        const style = document.createElement('style');
        style.type = 'text/css';
        style.id = 'bookmarkStyle';
        style.innerHTML = `
            .toolbar-addressbar .bookmark-bar {
                height: 34px;
                border-top-width: 0;
                border-bottom-width: 0;
                order: 0;
                width: 550px;
                max-width: 45%;
                background: transparent;
            }

            .toolbar-addressbar .bookmark-bar button {
                background: transparent;
                color: inherit;
            }
        `;
        document.getElementsByTagName('head')[0].appendChild(style);
    };

    function move_bb () {
        if (!document.getElementById('bookmarkStyle')) {
            addStyle();
        }
        const ab = document.querySelector(".toolbar-addressbar");
        const bb = document.querySelector(".bookmark-bar");
        ab.insertBefore(bb, document.querySelector('.addressfield').nextSibling);
    };

    var appendChild = Element.prototype.appendChild;
    Element.prototype.appendChild = function () {
        if (arguments[0].tagName === 'DIV') {
            setTimeout(function() {
                if (this.classList.contains('bookmark-bar')) {
                    move_bb();
                }
            }.bind(this, arguments[0]));
        }
        return appendChild.apply(this, arguments);
    };

    var removeChild = Element.prototype.removeChild;
    Element.prototype.removeChild = function () {
        if (arguments[0].tagName === 'DIV' && arguments[0].classList.contains('bookmark-bar')) {
            document.querySelector('.bookmark-bar').remove();
        }
        else {
            return removeChild.apply(this, arguments);
        }
    };
	setTimeout(function wait() {
		vivaldi.prefs.get("vivaldi.address_bar.visible", function(ab_visible) {
			if (ab_visible) {
				vivaldi.prefs.get("vivaldi.bookmarks.bar.visible", function (bb_visible) {
					if (bb_visible) {
						if (document.querySelector(".toolbar-addressbar") && document.querySelector(".bookmark-bar")) {
							document.querySelector(".bookmark-bar").classList.add("toolbar", "toolbar-large");
							move_bb();
						} else {
							setTimeout(wait, 300);
						}
					}
				});
			}
		});
	}, 300);
})();

