const insertScript = (html) => {
	return html += '\n\n<!-- Inserted by ejs-serve -->\n<script src="/ejs-serve/reload.js"></script>\n<!-- End ejs-serve -->\n'
}

module.exports = insertScript