import {default as express, Router} from "express";
import {UserService} from "../service/user.service";

export class UserController {

    public getRouter(): Router {
        return express.Router()
            .get("/all", async (req, res) => {
                const currentUserId = req.query.currentUserId;

                const user = await UserService.findAll(currentUserId).catch(
                    (e) => {
                        console.log(e.stack);
                        res.status(500).send(e.message);
                    }
                );

                res.status(200).send(user);
            })
            .get("/current", async (req, res) => {
                const currentUserId = req.query.currentUserId;

                const user = await UserService.findById(currentUserId).catch(
                    (e) => {
                        console.log(e.stack);
                        res.status(500).send(e.message);
                    }
                );

                res.status(200).send(user);
            })
            .get("/game-admin/:userId", async (req, res) => {
                const userId = req.params.userId;

                const user = await UserService.getGameAdminProfile(userId).catch(
                    (e) => {
                        console.log(e.stack);
                        res.status(500).send(e.message);
                    }
                );

                res.status(200).send(user);
            })
            .put("/data", async (req, res) => {
                const user = {
                    _id: req.body._id,
                    name: req.body.name,
                    avatar: req.body.avatar
                };

                const updatedUser = await UserService.updatePersonalData(user).catch(
                    (e) => {
                        console.log(e.stack);
                        res.status(500).send(e.message);
                    }
                );

                res.status(200).send(updatedUser);
            })
            .put("/game-admin-info", async (req, res) => {
                const userId = req.query.currentUserId;
                const info = req.body;

                const updatedUser = await UserService.updateGameAdminInfo(userId, info).catch(
                    (e) => {
                        console.log(e.stack);
                        res.status(500).send(e.message);
                    }
                );

                res.status(200).send(updatedUser);
            })
            .put("/password", async (req, res) => {
                const user = {
                    _id: req.body.id,
                    password: req.body.password,
                    newPassword: req.body.newPassword
                };

                const updatedUser = await UserService.updatePassword(user).catch(
                    (e) => {
                        console.log(e.stack);
                        res.status(500).send(e.message);
                    }
                );

                res.status(200).send(updatedUser);
            })
     
    }

}
