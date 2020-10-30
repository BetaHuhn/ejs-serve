const http = require('http')
const WebSocket = require('ws')
const reloadScript = require('./utils/reloadScript')
const insertScript = require('./utils/insertScript')

class Server {
	constructor(port) {
		this.port = port || 8080
		this.html = ''

		const server = http.createServer((req, res) => {
			const pathname = req.url

			const fileEnding = pathname.split('.')[1]
			const noFileEnding = fileEnding === undefined

			if (fileEnding === 'html' || pathname === '/' || pathname === '' || noFileEnding) {

				const content = this.html
				res.writeHead(200, { 'content-type': 'text/html' })
				res.end(content)

			} else if (pathname === '/ejs-serve/reload.js') {

				res.setHeader('Content-Type', 'text/javascript')

				const script = reloadScript(this.port)
				res.end(script)

			} else {

				res.writeHead(404, { 'Content-Type': 'text/plain' })
				res.end('page not found')

			}
		})

		const wss = new WebSocket.Server({ server })

		this.wss = wss
		this.server = server
	}

	start(html) {
		return new Promise((resolve) => {

			this.html = insertScript(html)
			this.server.listen(this.port, () => {
				resolve()
			})

		})
	}

	restart(html) {
		return new Promise((resolve) => {

			this.wss.clients.forEach((client) => client.send('reload'))

			this.server.close(() => {

				this.start(html).then(() => {
					resolve()
				})

			})

		})
	}
}

module.exports = Server