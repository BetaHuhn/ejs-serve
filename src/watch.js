const ejs = require('ejs')
const fs = require('fs')
const log = require('./utils/log')

class Watcher {
	constructor(file, data, dataFile, server, network) {
		this.file = file
		this.data = data
		this.dataFile = dataFile
		this.server = server
		this.network = network
	}

	async run() {
		const html = await ejs.renderFile(this.file, this.data)
		await this.server.start(html)

		this.watchFile()

		if (this.dataFile !== undefined) {
			this.watchData()
		}

		log.info(`[ejs-serve] watching and serving file '${ this.file }' at ${ this.network }`)
	}

	async watchFile() {
		fs.watchFile(this.file, { interval: 500 }, async () => {
			log.info(`[ejs-serve] restarting due to changes...`)

			const newHtml = await ejs.renderFile(this.file, this.data)
			await this.server.restart(newHtml)

			log.info(`[ejs-serve] watching and serving file '${ this.file }' at ${ this.network }`)
		})
	}

	async watchData() {
		fs.watchFile(this.dataFile, { interval: 500 }, async () => {
			log.info(`[ejs-serve] restarting due to changes...`)

			try {
				const rawData = fs.readFileSync(this.dataFile)
				this.data = JSON.parse(rawData)
			} catch (err) {
				log.fail(`error: failed to parse JSON => ${ this.dataFile }`)
				process.exit()
			}

			const newHtml = await ejs.renderFile(this.file, this.data)
			await this.server.restart(newHtml)

			log.info(`[ejs-serve] watching and serving file '${ this.file }' at ${ this.network }`)
		})
	}
}

module.exports = Watcher