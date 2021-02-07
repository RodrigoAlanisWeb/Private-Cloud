
const path = require("path");

const slash = process.platform === "win32" ? "\\" : "/";

const convertPath = (urlpath) => {
    const relativePath = urlpath ? urlpath.replace(/-/g, slash) : slash;
    const absolutePath = path.join(__dirname, "../uploads/" + relativePath);

    return {
        "relative" : relativePath,
        "absolute" : absolutePath
    };
}

module.exports = convertPath;