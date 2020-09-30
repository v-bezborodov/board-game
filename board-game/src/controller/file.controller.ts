import {default as express, Router} from "express";
import * as fs from "fs";
import * as uuid from "uuid";

const multer = require('multer');
var storage = multer.memoryStorage();
var upload = multer({storage: storage});

export class FileController {

    public getRouter(): Router {
        return express.Router()
            .post("", upload.single("file"), async (req: any, res) => {
                const name = uuid.v4() + req.file.originalname.match(/\.[^.]+$/)[0];

                fs.writeFileSync(`./files/${name}`, req.file.buffer);

                res.status(200).send({path: `${name}`});
            })
    }

}
