(function () {
  function getReactEventHandlers(thumbnail) {
    for (var key in thumbnail) {
      if (key.indexOf('__reactEventHandlers') > -1) {
        return key;
      }
    }
  }

  function addIcon(dial, url) {
    var buttonTitle = dial.querySelector('.button-title');
    if (buttonTitle) {
      var imgIcon = document.createElement('img');
      imgIcon.width = 16;
      imgIcon.height = 16;
      imgIcon.style.marginRight = '6px';
      imgIcon.style.verticalAlign = 'top';
      imgIcon.src = 'chrome://favicon/' + url;
      buttonTitle.insertBefore(imgIcon, buttonTitle.firstChild);
    }
  }

  function speedDialIcons() {
    var dials = document.querySelectorAll('.dial:not(.folder):not([data-icon-loaded="true"])');
    if (dials.length > 0) {
      for (var dial of dials) {
        dial.dataset.iconLoaded = true;
        var thumbnail = dial.querySelector('.thumbnail');
        if (thumbnail) {
          var fnKey = getReactEventHandlers(thumbnail);
          if (fnKey) {
            var url = thumbnail[fnKey].children[0].props.title;
            addIcon(dial, url);
          }
        }
      }
    }
  }

  var observeDOM = (function () {
    return function (obj, callback) {
      var obs = new MutationObserver(function (mutations, observer) {
        if (mutations[0].addedNodes.length || mutations[0].removedNodes.length) {
          callback();
        }
      });
      obs.observe(obj, {
        childList: true,
        subtree: true
      });
    };
  })();

  observeDOM(document, function () {
    speedDialIcons();
  });
})();