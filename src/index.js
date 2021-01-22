#!/usr/bin/env node

const program = require('commander')
const packageJson = require('../package.json')
const Runner = require('./runner')

program
	.version(packageJson.version, '-v, --version')
	.usage('-f <filename> -d <json string|file> -p <port>')
	.description('Build, watch and serve your EJS templates in your browser.')

program
	.option('-f, --file <path>', 'path to ejs file')
	.option('-d, --data <json>', 'JSON string or path to json file')
	.option('-p, --port <number>', 'port on which to serve the file', 8080)
	.option('-e, --email [boolean]', 'render file with mjml', false)
	.option('-o, --open [local/network]', 'open file in browser automatically', false)
	.action((args) => {
		const runner = new Runner(args, program)
		runner.serve()
	})

program.on('--help', () => {
	console.log('')
	console.log('Example call:')
	console.log('  $ ejs-serve --file index.ejs --data options.json --port 3000')
})

program.parse(process.argv)