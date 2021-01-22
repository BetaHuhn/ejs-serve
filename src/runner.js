const fs = require('fs')
const runningAt = require('running-at')
const Server = require('./server')
const Watcher = require('./watcher')
const log = require('./utils/log')

class Runner {
	constructor(args, program) {
		this.args = args || []
		this.program = program
	}

	async serve() {
		const { file, data, port, email, open } = this.args

		if (!file) {
			return this.program.help()
		}

		if (!fs.existsSync(file)) {
			return log.fail(`error: file not found => ${ file }`)
		}

		const shouldOpen = open !== false
		if (typeof open === 'string' && [ 'network', 'local' ].includes(open) === false) {
			log.fail(`error: '${ open }' not valid for option --open, use network or local instead`)
			process.exit(1)
		}

		const dataFile = fs.existsSync(data) ? data : undefined

		let json
		try {
			const rawData = dataFile !== undefined ? fs.readFileSync(data) : data
			json = JSON.parse(rawData)
		} catch (err) {
			log.fail(`error: failed to parse JSON => ${ data }`)
			process.exit(1)
		}

		log.info(`starting...`)
		const server = new Server(port)

		const ips = runningAt(port)
		const ip = open === 'network' ? ips.network : ips.local

		if (email === true) log.info(`using mjml...`)

		const watcher = new Watcher(file, json, dataFile, email, server, ip, shouldOpen)
		watcher.run()

	}
}

module.exports = Runner