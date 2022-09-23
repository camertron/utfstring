const path = require("path");

module.exports = {
    mode: "production",
    entry: "./dist/index.js",
    output: {
        library: {
            type: "umd",
        },
        path: path.join(__dirname, "browser"),
        filename: "utfstring.js",
    },
};
