<div align="center">

# ejs-serve

[![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/BetaHuhn/ejs-serve/blob/master/LICENSE) ![David](https://img.shields.io/david/betahuhn/ejs-serve) [![npm](https://img.shields.io/npm/v/ejs-serve)](https://www.npmjs.com/package/ejs-serve)

Build, watch and serve your EJS templates in your browser.

</div>

## 👋 Introduction

[ejs-serve](https://github.com/BetaHuhn/ejs-serve) is a CLI tool for developing/working with EJS templates.

- renders your EJS templates with data
- serves the files to your browser
- watches for file changes and reloads your browser automatically
- no extra files in your working directory
- also watches for changes in your data

## 🚀 Get started

Install [ejs-serve](https://github.com/BetaHuhn/ejs-serve) globally via npm:
```shell
npm install ejs-serve -g
```

After that `ejs-serve` is ready to be used 🎉

## 📚 Usage

```shell
Usage: ejs-serve -f <filename> -d <json string|file> -p <port>        

Build, watch and serve your EJS templates in your browser.

Options:
  -f, --file <path>    path to ejs file
  -d, --data <json>    JSON string or path to json file
  -p, --port <number>  port on which to serve the file (default: 8080)
  -v, --version        output the version number
  -h, --help           display help for command
```

## 🛠️ Examples

### Render EJS template with data from JSON file and serve it

```shell
ejs-serve -f index.ejs -d data.json
```

### Render EJS template with data from JSON string and serve it

```shell
ejs-serve -f index.ejs -d '{"message":"Hello World!"}'
```

### Serve on custom port

```shell
ejs-serve -f index.ejs -d data.json -p 3000
```

### Use it in another project

If you want to use `ejs-serve` for development in another project, add it to your dev dependencies:

```shell
npm install ejs-serve --save-dev
```

And include this command in your `package.json`

```json
  "scripts": {
    "templates": "ejs-serve -f ./path/to/file.ejs -d '{\"message\":\"Hello!\"}'"
  },
```

## 📝 To do

Here is what's currently planned for [ejs-serve](https://github.com/BetaHuhn/ejs-serve):

- render multiple files/whole directory
- render files and output them to directory

## 💻 Development

Issues and PRs are very welcome!

- run `yarn lint` or `npm run lint` to use eslint.
- run `yarn example` or `npm run example` to serve the example EJS file

Please check out the [contributing guide](CONTRIBUTING.md) before you start.

This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html). To see differences with previous versions refer to the [CHANGELOG](CHANGELOG.md).

## ❔ About

This library was developed by me ([@betahuhn](https://github.com/BetaHuhn)) in my free time. If you want to support me:

[![Donate via PayPal](https://img.shields.io/badge/paypal-donate-009cde.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=394RTSBEEEFEE)

## License

Copyright 2020 Maximilian Schiller

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
