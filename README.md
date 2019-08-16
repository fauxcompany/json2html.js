# json2html
This is a repository to build HTML based in json struct

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
```

You can check the example in docs folder.

## Contributions
Yes, please! Everybody is welcome.