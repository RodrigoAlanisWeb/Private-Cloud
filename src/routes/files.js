const { Router } = require("express");
const router = Router();

const file_upload = require("express-fileupload");
const convertPath = require("../functions/convertPath");
const path = require("path");

router.use(file_upload({
    debug: true,
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "../uploads/tmp")
}));


module.exports = router;