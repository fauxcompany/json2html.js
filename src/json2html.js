class JSON2HTML {
  static get selfCloseTags() {
    return [
      'area', 'base', 'br', 'col', 'embed', 'hr',
      'img', 'input', 'link', 'meta', 'param', 'source',
      'track', 'wbr', 'command', 'keygen', 'menuitem',
    ];
  }

  static build(json) {
    if (!json) return '';
    const atributes = JSON2HTMLBuilder.attributtes(json);
    if (JSON2HTMLBuilder.isSelfCloseTag(json)) {
      return `<${json.tag} ${atributes}/>`;
    }
    const children = JSON2HTMLBuilder.children(json);
    const content = JSON2HTMLBuilder.content(json);
    return `<${json.tag} ${atributes}>${children} ${content}</${json.tag}>`;
  }

  static unbuild(html) {
    if (!html) return {};
    const el = document.createElement('html');
    el.innerHTML = html;
    const body = el.getElementsByTagName('body')[0];
    if (!body) return {};
    const first = body.children[0];
    if (!first) return {};
    return JSON2HTMLUnbuilder.node2json(first);
  }
}

class JSON2HTMLBuilder {
  static attributtes(json) {
    if (!json.attributes) return '';
    let html = '';
    const keys = Object.keys(json.attributes);
    for (const index in keys) {
      if ({}.hasOwnProperty.call(keys, index)) {
        html += ` ${keys[index]}="${json.attributes[keys[index]]}"`;
      }
    }
    return html;
  }

  static children(json) {
    if (!json.children) return '';
    let html = '';
    for (const index in json.children) {
      if ({}.hasOwnProperty.call(json.children, index)) {
        html += JSON2HTML.build(json.children[index]);
      }
    }
    return html;
  }

  static content(json) {
    return json && json.content || '';
  }

  static isSelfCloseTag(json) {
    return (JSON2HTML.selfCloseTags.indexOf(json.tag)>-1);
  }
};


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
    }
    return attributes;
  }

  static content(nodeEl) {
    const cloned = nodeEl.cloneNode();
    while (cloned.firstChild) {
      cloned.removeChild(cloned.firstChild);
    }
    return cloned.innerText;
  }

  static children(nodeEl) {
    const children = [];
    for (const index in [].slice.call(nodeEl.children)) {
      if ({}.hasOwnProperty.call(nodeEl.children, index)) {
        children.push(JSON2HTMLUnbuilder.node2json(nodeEl.children[index]));
      }
    }
    return children;
  }
  static node2json(nodeEl) {
    return {
      tag: nodeEl.tagName.toLowerCase(),
      attributes: JSON2HTMLUnbuilder.attributes(nodeEl),
      content: JSON2HTMLUnbuilder.content(nodeEl),
      children: JSON2HTMLUnbuilder.children(nodeEl),
    };
  }
};
