const fs = require('fs')

const prepare = (port) => {
	const raw = fs.readFileSync('./src/scripts/reload.js', 'utf8')
	return raw.replace('WS_ENDPOINT_CHANGE', port)
}

module.exports = prepare