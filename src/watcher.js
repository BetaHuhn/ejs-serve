const ejs = require('ejs')
const fs = require('fs')
const mjml = require('mjml')
const open = require('open')

const log = require('./utils/log')

class Watcher {
	constructor(file, data, dataFile, email, server, network, shouldOpen) {
		this.file = file
		this.data = data
		this.dataFile = dataFile
		this.email = email
		this.server = server
		this.network = network
		this.shouldOpen = shouldOpen
	}

	async run() {
		const html = await this.renderFile()
		await this.server.start(html)

		this.watchFile()

		if (this.dataFile !== undefined) {
			this.watchData()
		}

		log.info(`watching and serving file '${ this.file }' at ${ this.network }`)
		await this.openInBrowser()
	}

	async watchFile() {
		fs.watchFile(this.file, { interval: 500 }, async () => {
			log.info(`restarting due to changes...`)

			const html = await this.renderFile()
			await this.server.restart(html)

			log.info(`watching and serving file '${ this.file }' at ${ this.network }`)
		})
	}

	async watchData() {
		fs.watchFile(this.dataFile, { interval: 500 }, async () => {
			log.info(`restarting due to changes...`)

			try {
				const rawData = fs.readFileSync(this.dataFile)
				this.data = JSON.parse(rawData)
			} catch (err) {
				log.fail(`error: failed to parse JSON => ${ this.dataFile }`)
				process.exit()
			}

			const html = await this.renderFile()
			await this.server.restart(html)

			log.info(`watching and serving file '${ this.file }' at ${ this.network }`)
		})
	}

	async renderFile() {
		const rawHtml = await ejs.renderFile(this.file, this.data)

		if (this.email === true) {
			const result = mjml(rawHtml, { validationLevel: 'skip' })

			if (result.errors.length > 0) {
				log.fail(result.errors)
				throw new Error(JSON.stringify(result.errors))
			}

			return result.html
		}

		return rawHtml
	}

	async openInBrowser() {
		if (this.shouldOpen) {
			try {
				await open(`${ this.network }`)
			} catch (err) {
				log.warn(`Could not open file in browser automatically`)
			}
		}
	}
}

module.exports = Watcher