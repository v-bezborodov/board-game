import {default as express, Router} from "express";
import {MessageService} from "../service/message.service";

export class MessageController {

    public getRouter(): Router {
        return express.Router()
            .post("", async (req, res) => {
                await MessageService.create(req.body)
                    .then((message) => {
                        res.status(200).send(message);
                    })
                    .catch((e) => {
                        res.status(500).send(e.message);
                    })
            })
            .get('/:conversationId', async (req, res) => {
                const conversationId = req.params.conversationId;
                await MessageService.getByConversationId(conversationId)
                    .then((message) => {
                        res.status(200).send(message);
                    })
                    .catch((e) => {
                        res.status(500).send(e.message);
                    })
            })

    }


}
