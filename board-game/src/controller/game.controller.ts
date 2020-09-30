import {default as express, Router} from "express";
import {GameService} from "../service/game.service";

export class GameController {

    public getRouter(): Router {
        return express.Router()
            .post("", async (req, res) => {
                const game = {
                    name: req.body.name,
                    patternId: req.body.patternId,
                    userId: req.query.currentUserId,
                    patternName: req.body.patternName,
                    date: req.body.date,
                    price: req.body.price,
                    description: req.body.description,
                    avatar: req.body.avatar
                };

                const savedPattern = await GameService.create(game).catch(
                    (e) => {
                        console.log(e.stack);
                        res.status(500).send(e.message);
                    }
                );

                res.status(200).send(savedPattern);
            })
            .get("", async (req, res) => {
                const userId = req.query.currentUserId;

                const games = await GameService.getAll(userId).catch(
                    (e) => {
                        console.log(e.stack);
                        res.status(500).send(e.message);
                    }
                );

                res.status(200).send(games);
            })
            .get("/profile/:id", async (req, res) => {
                const id = req.params.id;

                const game = await GameService.getProfileById(id).catch(
                    (e) => {
                        console.log(e.stack);
                        res.status(500).send(e.message);
                    }
                );

                res.status(200).send(game);
            })
            .put("/:gameId/requests", async (req, res) => {
                const userId = req.query.currentUserId;
                const gameId = req.params.gameId;

                await GameService.createRequest(gameId, userId).catch(
                    (e) => {
                        console.log(e.stack);
                        res.status(500).send(e.message);
                    }
                );

                res.status(200).send();
            })
            .get("/requests", async (req, res) => {
                const userId = req.query.currentUserId;

                const requests = await GameService.getRequests(userId).catch(
                    (e) => {
                        console.log(e.stack);
                        res.status(500).send(e.message);
                    }
                );

                res.status(200).send(requests);
            })
            .put("/requests/:gameId/:userId/accept", async (req, res) => {
                const userId = req.params.userId;
                const gameId = req.params.gameId;

                await GameService.acceptRequest(gameId, userId).catch(
                    (e) => {
                        console.log(e.stack);
                        res.status(500).send(e.message);
                    }
                );

                res.status(200).send();
            })
            .put("/requests/:gameId/:userId/decline", async (req, res) => {
                const userId = req.params.userId;
                const gameId = req.params.gameId;

                await GameService.declineRequest(gameId, userId).catch(
                    (e) => {
                        console.log(e.stack);
                        res.status(500).send(e.message);
                    }
                );

                res.status(200).send();
            })
            .delete("/:id", async (req, res) => {
                const id = req.params.id;

                await GameService.deleteById(id).catch(
                    (e) => {
                        console.log(e.stack);
                        res.status(500).send(e.message);
                    }
                );

                res.status(200).send();
            })
            .put("/:id/start", async (req, res) => {
                const id = req.params.id;

                await GameService.start(id).catch(
                    (e) => {
                        console.log(e.stack);
                        res.status(500).send(e.message);
                    }
                );

                res.status(200).send();
            });
    }

}
