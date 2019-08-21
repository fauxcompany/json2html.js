# json2html
This is a repository to build HTML based in json struct

## Badges
### Github
![tag](https://img.shields.io/github/tag/fauxcompany/json2html.js.svg)
![issues](https://img.shields.io/github/issues/fauxcompany/json2html.js.svg)
![contributors](https://img.shields.io/github/contributors/fauxcompany/json2html.js.svg)
![license](https://img.shields.io/github/license/fauxcompany/json2html.js.svg)
![code-size](https://img.shields.io/github/languages/code-size/fauxcompany/json2html.js.svg)
![top-languages](https://img.shields.io/github/languages/top/fauxcompany/json2html.js.svg)
![languages](https://img.shields.io/github/languages/count/fauxcompany/json2html.js.svg)

### Social
![forks](https://img.shields.io/github/forks/fauxcompany/json2html.js.svg?style=social)
![stars](https://img.shields.io/github/stars/fauxcompany/json2html.js.svg?style=social)
![watchers](https://img.shields.io/github/watchers/fauxcompany/json2html.js.svg?style=social)

### Contribuidores
- [andergtk](https://github.com/leomoty)  ![followers](https://img.shields.io/github/followers/andergtk.svg?style=social)
- [guifabrin](https://github.com/guifabrin) - ![followers](https://img.shields.io/github/followers/guifabrin.svg?style=social)
- [leomoty](https://github.com/leomoty)  ![followers](https://img.shields.io/github/followers/leomoty.svg?style=social)

### Outros
[![BCH compliance](https://bettercodehub.com/edge/badge/fauxcompany/json2html.js?branch=master)](https://bettercodehub.com/)
## Base Struct
The json payload is as follow:
```json
{
	"tag": "div",
	"attributes": {
		"id": "some-id",
		"class": "some-class"
	},
	"children": [
		//...components
	],
	"content": "some-text-or-html",
}
```

## Restrictions
If the component tag is self closing, content and children will be ignored;

## Usage
```javascript
	var someJson = {};
	JSON2HTML.build(someJson);
	var someHtml = '<div></div>';
	JSON2HTML.unbuild(someHtml);
```

You can check the example in docs folder.

## Contributions
Yes, please! Everybody is welcome.
