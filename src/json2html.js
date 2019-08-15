class JSON2HTML {

	static get selfCloseTags() {
		return [
						"area",  "base",  "br",      "col",    "embed", "hr", 
						"img",   "input", "link",    "meta",   "param",  "source",
						"track", "wbr",   "command", "keygen", "menuitem"
					];
	}

	static attributtes(json) {
		if (!json.attributes) return "";
		let html = "";
		var keys = Object.keys(json.attributes);
		for(var index in keys){
			html += " "+keys[index]+"=\""+json.attributes[keys[index]]+"\"";
		}
		return html;
	}

	static children(json) {
		if (!json.children) return "";
		let html = "";
		for(var index in json.children){
			html += JSON2HTML.build(json.children[index]);
		}
		return html;
	}

	static content(json) {
		if (!json.content) return "";
		return json.content;
	}

	static build(json){
		let html = "<"+json.tag;
		html += JSON2HTML.attributtes(json);
		if (JSON2HTML.isSelfCloseTag(json))
			return html + "/>";
		html += ">";
		html += JSON2HTML.children(json);
		html += JSON2HTML.content(json);
		return html + "</"+json.tag+">";
	}

	static isSelfCloseTag(json){
		return (JSON2HTML.selfCloseTags.indexOf(json.tag)>-1);
	}
};