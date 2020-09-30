import {default as express, Router} from "express";
import {ConversationService} from "../service/conversation.service";

export class ConversationController {

    public getRouter(): Router {
        return express.Router()
            .post("", async (req, res) => {
                await ConversationService.create(req.body, req.query.currentUserId)
                    .then((conversation) => {
                        res.status(200).send(conversation);
                    })
                    .catch((e) => {
                        res.status(500).send(e.message);
                    })
            })
            .get("", async (req, res) => {
                await ConversationService.getAllByUserId(req.query.currentUserId)
                    .then((conversations) => {
                    res.status(200).send(conversations);
                })
                    .catch((e) => {
                        res.status(500).send(e.message);
                    })
            })

    }


}
