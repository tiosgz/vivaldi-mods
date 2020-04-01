/*
 * Speed Dial icons
 * Written by Tam710562
 */

window.gnoh = Object.assign(window.gnoh || {}, {
  createElement: function (tagName, attribute, parent, inner, options) {
    if (typeof tagName === 'undefined') {
      return;
    }
    if (typeof options === 'undefined') {
      options = {};
    }
    if (typeof options.isPrepend === 'undefined') {
      options.isPrepend = false;
    }
    const el = document.createElement(tagName);
    if (!!attribute && typeof attribute === 'object') {
      for (let key in attribute) {
        if (key === 'text') {
          el.textContent = attribute[key];
        } else if (key === 'html') {
          el.innerHTML = attribute[key];
        } else if (key === 'style' && typeof attribute[key] === 'object') {
          for (let css in attribute.style) {
            el.style[css] = attribute.style[css];
          }
        } else if (key === 'events' && typeof attribute[key] === 'object') {
          for (let event in attribute.events) {
            if (typeof attribute.events[event] === 'function') {
              el.addEventListener(event, attribute.events[event]);
            }
          }
        } else if (typeof el[key] !== 'undefined') {
          el[key] = attribute[key];
        } else {
          if (typeof attribute[key] === 'object') {
            attribute[key] = JSON.stringify(attribute[key]);
          }
          el.setAttribute(key, attribute[key]);
        }
      }
    }
    if (!!inner) {
      if (!Array.isArray(inner)) {
        inner = [inner];
      }
      for (let i = 0; i < inner.length; i++) {
        if (inner[i].nodeName) {
          el.append(inner[i]);
        } else {
          el.append(this.createElementFromHTML(inner[i]));
        }
      }
    }
    if (typeof parent === 'string') {
      parent = document.querySelector(parent);
    }
    if (!!parent) {
      if (options.isPrepend) {
        parent.prepend(el);
      } else {
        parent.append(el);
      }
    }
    return el;
  },
  getReactEventHandlersKey: function (element) {
    if (!this.reactEventHandlersKey) {
      if (!element) {
        element = document.getElementById('browser');
      } else if (typeof element === 'string') {
        element = document.querySelector(element);
      }
      if (!element || element.ownerDocument !== document) {
        return;
      }
      this.reactEventHandlersKey = Object.keys(element).find(function (key) {
        return key.startsWith('__reactEventHandlers');
      });
    }
    return this.reactEventHandlersKey;
  },
  observeDOM: function (obj, callback, config) {
    const obs = new MutationObserver(function (mutations, observer) {
      if (config) {
        callback(mutations, observer);
      } else {
        if (mutations[0].addedNodes.length || mutations[0].removedNodes.length) {
          callback(mutations, observer);
        }
      }
    });
    obs.observe(obj, config || {
      childList: true,
      subtree: true
    });
  }
});

(function () {
  function addIcon(dial, url) {
    var buttonTitle = dial.querySelector('.button-title');
    if (buttonTitle) {
      var imgIcon = gnoh.createElement('img', {
        width: 16,
        height: 16,
        style: {
          marginRight: '6px',
          verticalAlign: 'top'
        },
        src: 'chrome://favicon/' + url
      });
      buttonTitle.insertBefore(imgIcon, buttonTitle.firstChild);
    }
  }

  function speedDialIcons() {
    var dials = document.querySelectorAll('.dial:not(.folder):not([data-icon-loaded="true"])');
    if (dials.length > 0) {
      for (var dial of dials) {
        dial.dataset.iconLoaded = true;
        var fnKey = gnoh.getReactEventHandlersKey(dial);
        if (fnKey) {
          var url = dial[fnKey].children[3].props.bookmark.url;
          addIcon(dial, url);
        }
      }
    }
  }

  gnoh.observeDOM(document, function () {
    speedDialIcons();
  });
})();
