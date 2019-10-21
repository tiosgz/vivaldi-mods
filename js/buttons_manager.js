'use strict';

class ModButtonsManager {
    constructor(button, parentElement, nextSibling, createPopup, specificClass, otherClasses) {
        this.__btn = null;
        this.__pe = null;
        this.__ns = null;
        this.__cp = null;
        this.__cls = null;
        this.__oc = [];
        this.__popup = null;
        this.button = button;
        this.parentElement = parentElement;
        this.nextSibling = nextSibling;
        this.createPopup = createPopup;
        this.specificClass = specificClass;
        this.otherClasses = otherClasses;
        this.append();
    }

    set button(btn) {
        if (btn && btn.nodeType === Node.ELEMENT_NODE) {
            this.remove();
            this.__btn = btn;
            if (this.__btn) {
                this.__btn.addEventListener('click', this.togglePopup.bind(this));
                this.append();
            }
        } else {
            this.remove();
            this.__btn = null;
        }
    }
    get button() { return this.__btn; }

    set parentElement(pe) {
        if (pe && pe.nodeType === Node.ELEMENT_NODE) {
            this.remove();
            this.__pe = pe;
            this.append();
        } else {
            this.remove();
            this.__pe = null;
        }
    }
    get parentElement() { return this.__pe; }

    set nextSibling(ns) {
        if (ns && ns.nodeType === Node.ELEMENT_NODE) {
            this.remove();
            this.__ns = ns;
            this.append();
        } else {
            this.append();
            this.__ns = null;
        }
    }
    get nextSibling() { return this.__ns; }

    set createPopup(cp) {
        if (typeof(cp) === 'function')
            this.__cp = cp;
        else
            this.__cp = null;
    }
    get createPopup() { return this.__cp; }

    set specificClass(cls) {
        if (typeof(cls) === 'string') {
            this.__cls = cls;
        } else {
            this.__cls = null;
        }
    }
    get specificClass() { return this.__cls; }

    set otherClasses(oc) {
        if (oc && oc.constructor === Array) {
            this.__oc = oc.filter(cls => { return typeof(cls) === 'string'; });
        } else if (typeof(oc) === 'string') {
            this.__oc = [oc];
        } else {
            this.__oc = [];
        }
    }
    get otherClasses() { return this.__oc; }

    remove() {
        if (this.__btn && this.__btn.parentElement)
            this.__btn.parentElement.removeChild(this.__btn);
    }

    append() {
        this.remove();
        if (this.__btn && this.__pe) {
            if (this.__ns && this.__ns.parentElement === this.__pe)
                this.__pe.insertBefore(this.__btn, this.__ns)
            else
                this.__pe.appendChild(this.__btn);
        }
    }

    togglePopup() {
        if (this.__popup && this.__popup.parentElement)
            this.removePopup();
        else
            this.makePopup();
    }

    makePopup() {
        this.removePopup();
        if (this.__pe) {
            // TODO: classes, correct placing, lostFocus
            const popup = document.createElement('div');
            this.__popup = popup;
            popup.classList.add('mod-popup');
            if (this.__cls) popup.classList.add(this.__cls);
            this.__oc.forEach(cl => popup.classList.add(cl));
            popup.style.setProperty('position', 'absolute');
            popup.style.setProperty('background-color', 'var(--colorBg)');
            popup.style.setProperty('min-height', '100px');
            popup.style.setProperty('min-width', '100px');
            if (this.__cp) {
                const content = this.__cp();
                if (content && content.nodeType)
                    popup.appendChild(content);
            }
            // show it (to know its size)
            this.__pe.appendChild(popup);
            // calculate placement
            // const browserRect = document.querySelector('#browser').getBoundingClientRect();
            const parentRect = this.__pe.getBoundingClientRect();
            const btnRect = this.__btn.getBoundingClientRect();
            const popupRect = popup.getBoundingClientRect();
            popup.style.setProperty('left', `${Math.max(0, btnRect.right - parentRect.x - popupRect.width)}px`);
            popup.style.setProperty('top', `${parentRect.height}px`);

            // popup.setAttribute('style', 'position: absolute; top: 40px; left: 1300px; height: 100px; width: 100px; background: var(--colorBg);');
        }
    }

    removePopup() {
        if (this.__popup) {
            if (this.__popup.parentElement)
                this.__popup.parentElement.removeChild(this.__popup);
            this.__popup = null;
        }
    }
    // Properties:
    // - button - the button object itself
    // - parent - parent element of the button
    // - next - next sibling of the button (used for inserting it), can null
    // - createPopup() - logic for creating the popup
    // Other important notes
    // - add lostFocus() to the popup
    // - handle insertBefore(), appendChild() and removeChild()
    // - handle AB placement change / hiding / showing
    // - calculate if the popup should be placed above or below its parent
}

let button = document.createElement('button');
button.classList.add('mod-button-test');
button.style.height = '40px';
button.style.width = '100px';
button.innerHTML = '<svg viewBox="0 0 100 40"><path d="M5 5h90v30l-30 -30, -30 30, -30 -30z" /></svg>';
let div = document.createElement('div');
div.classList.add('button-toolbar');
div.appendChild(button);
let ab = document.querySelector('.toolbar-addressbar');
let mkContents = () => {
    const main = document.createElement('div');
    main.setAttribute('style', 'min-height: 200px; min-width: 150px; background: aqua; border: 10px solid red; box-sizing: border-box;');
    const div = document.createElement('div');
    div.style.margin = '20px 10px 30px 100px';
    div.style.height = '130px';
    div.style.width = '20px';
    div.style.backgroundColor = 'lightgreen';
    main.appendChild(div);
    return main;
};
let mgr = new ModButtonsManager(div, ab, null, mkContents, 'mod-test');
