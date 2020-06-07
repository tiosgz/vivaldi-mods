(function () {
    function addStyle() {
        let st = document.querySelector('style#-mod-themed-img-style');
        if (!st) {
            (function wait() {
                if (document.head) {
                    st = document.createElement('style');
                    st.id = '-mod-themed-img-style';
                    st.innerHTML = ``;
                    document.head.appendChild(st);
                } else {
                    setTimeout(wait, 300);
                }
            })();
        }
    }

    function getRGB(color) {
        color = color.trim();
        let r = 0, g = 0, b = 0;
        if (/^\#?([0-9a-fA-F]{3,4}){1,2}$/.test(color)) {
            if (color.startsWith('#'))
                color = color.substring(1);
            if (color.length === 3 || color.length === 4) {
                color = color.replace(/[0-9a-fA-F]/gi, '$&$&');
            }
            r = parseInt(color.substring(0, 2), 16);
            g = parseInt(color.substring(2, 4), 16);
            b = parseInt(color.substring(4, 6), 16);
        } else if (/^rgba?\s*\((\s*[0-9]{1,3}\s*,\s*){2}[0-9]{1,3}(\s*,\s*[0-9]*?\.?[0-9]+)?\s*\)$/i.test(color)) {
            color = color.replace(/^rgba?\s*\(/i, '');
            color = color.replace(')', '');
            let rgb = color.split(',');
            r = parseInt(rgb[0]);
            g = parseInt(rgb[1]);
            b = parseInt(rgb[2]);
        }
        return [r, g, b];
    }

    function getMatrixValues(color) {
        let rgb = getRGB(color);
        let mvals = '';
        rgb.forEach(c => {
            let s = (c / 3 / 256).toFixed(3);
            mvals += "\n";
            for (let i = 0; i < 3; i++) {
                mvals += s + ' ';
            }
            mvals += '0 0';
        });
        // alpha
        mvals += "\n0 0 0 1 0";
        return mvals.replace("\n", ' ').trim();
    }

    function addFilters() {
        let svg = document.querySelector('svg#-mod-themed-img-svg');
        if (!svg) {
            svg = document.createElement('svg');
            (function wait() {
                let br = document.querySelector('#browser');
                if (br)
                    br.appendChild(svg);
                else
                    setTimeout(wait, 300);
            })();
            svg.height = 0;
            svg.width = 0;
            svg.id = '-mod-themed-img-svg';
            svg.innerHTML = '<defs></defs>';
        }
        let defs = svg.querySelector('defs');
        let normFilter = defs.querySelector('filter#-mod-themed-img-filter');
        if (!normFilter) {
            normFilter = document.createElement('filter');
            normFilter.id = '-mod-themed-img-filter';
            normFilter.colorInterpolationFilters = 'sRGB';
            normFilter.innerHTML = '<feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"/>';
            defs.appendChild(normFilter);
        }
        let accFilter = defs.querySelector('filter#-mod-themed-img-filter-acc');
        if (!accFilter) {
            accFilter = document.createElement('filter');
            accFilter.id = '-mod-themed-img-filter-acc';
            accFilter.colorInterpolationFilters = 'sRGB';
            accFilter.innerHTML = '<feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"/>';
            defs.appendChild(accFilter);
        }
        updateFilters();
    }

    function getColor(accent, callback) {
        // TODO
    }

    function updateFilters() {
        const svg = document.querySelector('svg#-mod-themed-img-svg');
        if (!svg) {
            addFilters();
            return;
        }
        const nmatrix = svg.querySelector('filter#-mod-themed-img-filter feColorMatrix');
        const accmatrix = svg.querySelector('filter#-mod-themed-img-filter-acc feColorMatrix');
        if (!nmatrix || !accmatrix) {
            addFilters();
            return;
        }
        // TODO
    }
})();
