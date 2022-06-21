/*
* json2html.js - This is a repository to build HTML based in JSON struct
* FauxCompany (c) - 2019
* MIT License
* https://github.com/fauxcompany/json2html.js
*/

'use strict';

class JSON2HTML {


    // Etiquetas que no necesitan </>
    static get selfCloseTags() {
        return [
            'area', 'base', 'br', 'col', 'embed', 'hr',
            'img', 'input', 'link', 'meta', 'param', 'source',
            'track', 'wbr', 'command', 'keygen', 'menuitem',
        ];
    }


    // Construye el HTML derivado del JSON
    static render(json) {
        if (!json || !json.tag) return '';
        const attributes = JSON2HTMLBuilder.attributes(json);
        if (JSON2HTMLBuilder.isSelfCloseTag(json)) {
            return `<${json.tag}${attributes}/>`;
        }
        const children = JSON2HTMLBuilder.children(json);
        return `<${json.tag}${attributes}>${children}</${json.tag}>`;
    }


    // Construye el JSON del HTML
    // Valido para Vanilla JavaScript - no Node.js

    /*
    static unbuild(html) {
        if (!html) return {};
        const el = document.createElement('html');
        el.innerHTML = html;
        const body = el.querySelector('body');
        if (!body) return {};
        const [first] = body.children;
        if (!first) return {};
        return JSON2HTMLUnbuilder.node2json(first);
    }
    */
}



/*
 CONVERTIR JSON A HTML
 JSON => HTML
*/
class JSON2HTMLBuilder {
    static attributes(json) {
        if (!json.attr) return '';
        let html = '';
        const keys = Object.keys(json.attr);
        for (const index in keys) {
            if ({}.hasOwnProperty.call(keys, index)) {
                html += ` ${keys[index]}="${json.attr[keys[index]]}"`;
            }
        }
        return html;
    }

    static children(json) {
        if (!json.children) return '';
        let html = '';
        for (const index in json.children) {
            if ({}.hasOwnProperty.call(json.children, index)) {
                if (typeof json.children[index] == 'object') {
                    html += JSON2HTML.render(json.children[index]);
                } else {
                    html += json.children[index];
                }
            }
        }
        return html;
    }

    static isSelfCloseTag(json) {
        return (JSON2HTML.selfCloseTags.indexOf(json.tag) > -1);
    }
};







/*

 CONVERTIR HTML A JSON
 HTML => JSON Object

*/
class JSON2HTMLUnbuilder {
    static attributes(nodeEl) {
        const attributes = {};
        const keys = Object.keys(nodeEl.attributes);
        for (const index in keys) {
            if ({}.hasOwnProperty.call(keys, index)) {
                const key = keys[index];
                const attribute = nodeEl.attributes[key];
                attributes[attribute.name] = attribute.value;
            }
        };
        return attributes;
    }

    static children(nodeEl) {
        const children = [];
        nodeEl.childNodes.forEach(function (element, index) {
            if (nodeEl.childNodes[index].nodeType === Node.ELEMENT_NODE) {
                children.push(JSON2HTMLUnbuilder.node2json(element, index));
            }
            if (nodeEl.childNodes[index].nodeType === Node.TEXT_NODE) {
                children.push(nodeEl.childNodes[index].textContent);
            }
        });
        return children;
    }
    static node2json(nodeEl) {
        return {
            tag: nodeEl.tagName.toLowerCase(),
            attributes: JSON2HTMLUnbuilder.attributes(nodeEl),
            children: JSON2HTMLUnbuilder.children(nodeEl),
        };
    }
}


module.exports = {JSON2HTML}
