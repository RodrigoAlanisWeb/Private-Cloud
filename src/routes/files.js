const { Router } = require("express");
const router = Router();

const file_upload = require("express-fileupload");
const convertPath = require("../functions/convertPath");
const path = require("path");
const fs = require("fs");
const { isArray } = require("util");

router.use(file_upload({
    debug: true,
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "../uploads/tmp")
}));

router.post("/upload/:path?", async (req, res) => {
    console.log(req.files.file);
    let files = req.files.file;
    const paths = convertPath(req.params.path);
    if(!Array.isArray(files)) {
        files = [files]
    }
    try {
        files.forEach(async (file)=>{
            const filePath = path.join(paths.absolute, file.name);
            await file.mv(filePath)
        })  
    } catch (error) {
        return res.json({
            "res": false,
            'msg': "Error At Uploading The File"
        });
    }

    return res.json({
        "res": true,
        "path": paths.relative
    })
});

router.get("/download/:name/:path?",(req,res) => {
    const paths = convertPath(req.params.path);
    const filePath = path.join(paths.absolute, req.params.name);

    res.download(filePath);
});

router.get("/read/:path?", async (req, res) => {
    const paths = convertPath(req.params.path);
    fs.readdir(paths.absolute, (err, data) => {

        if (err) {
            return res.json({
                "res": false,
                "msg": "The Dir Not Exists"
            })
        }

        return res.json({
            "res": true,
            data
        });
    })
});


module.exports = router;