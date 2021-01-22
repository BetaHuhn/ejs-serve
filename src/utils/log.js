const chalk = require('chalk')

const log = {
	info: (text) => {
		console.log(chalk.green(`[ejs-serve] ${ text }`))
	},
	warn: (text) => {
		console.log(chalk.yellow(`[ejs-serve] ${ text }`))
	},
	fail: (text) => {
		console.log(chalk.red(`[ejs-serve] ${ text }`))
	}
}

module.exports = log