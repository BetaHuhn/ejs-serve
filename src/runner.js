const fs = require('fs')
const runningAt = require('running-at')
const Server = require('./server')
const Watcher = require('./watcher')
const log = require('./utils/log')

class Runner {
	constructor(args) {
		this.args = args || []
	}

	async serve() {
		const { file, data, port } = this.args

		if (!fs.existsSync(file)) {
			return log.fail(`error: file not found => ${ file }`)
		}

		const dataFile = fs.existsSync(data) ? data : undefined

		let json
		try {
			const rawData = dataFile !== undefined ? fs.readFileSync(data) : data
			json = JSON.parse(rawData)
		} catch (err) {
			log.fail(`error: failed to parse JSON => ${ data }`)
			process.exit()
		}

		log.info(`[ejs-serve] starting...`)
		const server = new Server(port)

		const network = runningAt(port).network

		const watcher = new Watcher(file, json, dataFile, server, network)
		watcher.run()

	}
}

module.exports = Runner