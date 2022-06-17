const parse = (data) => {
	let body = {};
	if (data == null) {
		return null;
	}
	let parts = data.split('&');
	for (let i = 0; i < parts.length; i++) {
		let part = parts[i].split('=');
		body[part[0]] = part[1];
	}
	return body;
}

module.exports = parse;