const fs = require('fs')
const path = require('path')

const prepare = (port) => {
	const raw = fs.readFileSync(path.join(__dirname, '../scripts/reload.js'), 'utf8')
	return raw.replace('WS_ENDPOINT_CHANGE', port)
}

module.exports = prepare