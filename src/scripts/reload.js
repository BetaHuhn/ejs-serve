/* Adapted from https://github.com/alallier/reload/blob/master/lib/reload-client.js by Alexander J. Lallier */

(function reload() {
	const verbose = false
	const socketUrl = window.location.hostname
	const port = 'WS_ENDPOINT_CHANGE'
	let firstChange
	let navigatedAwayFromPage
	let socket

	if (verbose) {
		console.log('[ejs-serve] script loaded')
	}

	if (!('WebSocket' in window)) {
		throw new Error('ejs-serve only works with browsers that support WebSockets')
	}

	window.addEventListener('load', () => {
		if (verbose) console.log('[ejs-serve] Page loaded - calling wssWaiter')
		wssWaiter()
	})

	window.addEventListener('beforeunload', () => {
		if (verbose) console.log('[ejs-serve] navigated away from current url')

		navigatedAwayFromPage = true
	})

	const onMessage = (message) => {
		if (message.data === 'reload') {
			if (verbose) console.log('[ejs-serve] received reload message')
			socket.close()
		}
	}

	const onOpen = () => {
		if (verbose) console.log('[ejs-serve] socket opened')

		if (firstChange === true && navigatedAwayFromPage !== true) {
			if (verbose) console.log('[ejs-serve] reloading due to changes')
			firstChange = false
			window.location.reload()
		}
	}

	const onClose = () => {
		if (verbose) console.log('[ejs-serve] socket closed - calling wssWaiter')
		firstChange = true
		wssWaiter()
	}

	const onError = (msg) => {
		if (verbose) console.log(msg)
	}

	const wssWaiter = () => {
		if (verbose) console.log('[ejs-serve] waiting for socket')

		setTimeout(() => {
			socket = new WebSocket(`ws://${ socketUrl }:${ port }`)
			socket.onopen = onOpen
			socket.onclose = onClose
			socket.onerror = onError
			socket.onmessage = onMessage
		}, 250)
	}
}())