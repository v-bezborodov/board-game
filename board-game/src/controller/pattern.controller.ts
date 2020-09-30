import {default as express, Router} from "express";
import {PatternService} from "../service/pattern.service";

export class PatternController {

    public getRouter(): Router {
        return express.Router()
            .post("", async (req, res) => {
                const pattern = req.body;
                pattern.userId = req.query.currentUserId;

                const savedPattern = await PatternService.create(pattern).catch(
                    (e) => {
                        console.log(e.stack);
                        res.status(500).send(e.message);
                    }
                );

                res.status(200).send(savedPattern);
            })
            .delete("/:id", async (req, res) => {
                const id = req.params.id;

                await PatternService.deleteById(id).catch(
                    (e) => {
                        console.log(e.stack);
                        res.status(500).send(e.message);
                    }
                );

                res.status(200).send();
            })
            .get("/:id", async (req, res) => {
                const id = req.params.id;

                await PatternService.findById(id).catch(
                    (e) => {
                        console.log(e.stack);
                        res.status(500).send(e.message);
                    }
                );

                res.status(200).send();
            })
            .put("", async (req, res) => {
                const pattern = req.body;
                pattern.userId = req.query.currentUserId;

                await PatternService.update(pattern).catch(
                    (e) => {
                        console.log(e.stack);
                        res.status(500).send(e.message);
                    }
                );

                res.status(200).send();
            })
            .put("/publish", async (req, res) => {
                const patternId = req.body.id;

                await PatternService.publish(patternId).catch(
                    (e) => {
                        console.log(e.stack);
                        res.status(500).send(e.message);
                    }
                );

                res.status(200).send();
            })
            .get("", async (req, res) => {
                const userId = req.query.currentUserId;

                const patterns = await PatternService.getAllByUserId(userId).catch(
                    (e) => {
                        console.log(e.stack);
                        res.status(500).send(e.message);
                    }
                );

                res.status(200).send(patterns);
            })
            .get("/published/all", async (req, res) => {
                const userId = req.query.currentUserId;

                const patterns = await PatternService.getAllByUserId(userId).catch(
                    (e) => {
                        console.log(e.stack);
                        res.status(500).send(e.message);
                    }
                );

                res.status(200).send(patterns.filter((pattern: any) => pattern._doc.isPublish));
            })
            .post("/copy", async (req, res) => {

                const pattern = await PatternService.copy(req.body.id, req.body.name).catch(
                    (e) => {
                        console.log(e.stack);
                        res.status(500).send(e.message);
                    }
                );

                res.status(201).send(pattern);
            })
    }

}
