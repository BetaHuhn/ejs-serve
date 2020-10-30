const chalk = require('chalk')

const log = {
	info: (text) => {
		console.log(chalk.green(text))
	},
	fail: (text) => {
		console.log(chalk.red(text))
	}
}

module.exports = log