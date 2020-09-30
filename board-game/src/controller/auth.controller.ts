import * as express from "express";
import {Router} from "express";
import {SignupRequest} from "../model/dto/signup-request";
import {AuthService} from "../service/auth.service";

export class AuthController {

    public getRouter(): Router {
        return express.Router()
            .post("/signup", async (req, res) => {
                const signupRequest: SignupRequest = {
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    role: req.body.role
                };
                await AuthService.signup(signupRequest)
                    .then((value) =>
                        res.status(201).send(value)
                    )
                    .catch((e) => {
                        console.log(e.stack);

                        if (e.message.includes('E11000')) {
                            res.status(500).send('Почтовый ящик уже используется в системе.');
                        }

                        res.status(500).send(e.message);
                    });
            })
            .post("/signin", async (req, res) => {
                const email = req.body.email;
                const password = req.body.password;

                const authData = await AuthService.signin(email, password).catch(
                    (e) => {
                        console.log(e.stack);
                        res.status(500).send(e.message);
                    }
                );

                res.status(200).send(authData);
            })
    }
}
