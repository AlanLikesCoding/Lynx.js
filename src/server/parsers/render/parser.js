const parse = (html) => {
	html = html.split('');
	let result = [];
	for (let i = 0; i < html.length; i++) {
		if (html[i] == '{' && html[i + 1] == '{') {
			let key = '';
			let value = '';
			i += 2;
			while (html[i] != '}') {
				if (html[i] == ' ') {
					i++;
					continue;
				}
				key += html[i];
				i++;
			}
			i++;
			result.push({
				key: key,
				value: value,
			});
		} else {
			result.push({
				key: null,
				value: html[i],
			});
		}
	}
	return result;
}

const lexer = (result, data) => {
	let rendered = '';
	let keys = Object.keys(data);
	for (let i = 0; i < result.length; i++) {
		if (result[i].key != null) {
			let key = result[i].key;
			if (keys.includes(key) == false) continue;
			let value = data[key];
			result[i].value = value;
		}
	}
	for (let i = 0; i < result.length; i++) {
		rendered += result[i].value;
	}

	return rendered;
}

module.exports = { parse, lexer };