#!/usr/bin/env node

const program = require('commander')
const packageJson = require('../package.json')
const Runner = require('./runner')

program
	.version(packageJson.version, '-v, --version')

program
	.option('-f, --file <path>', 'path to ejs file')
	.option('-d, --data <json>', 'JSON string or path to json file')
	.option('-p, --port <number>', 'port on which to serve the file', 8080)
	.action((args, program) => {
		const runner = new Runner(args, program)
		runner.serve()
	})

program.on('command:*', (operands) => {
	console.error(`error: unknown command '${ operands[0] }'\n`)
	program.help()
	process.exitCode = 1
})

program.parse(process.argv)