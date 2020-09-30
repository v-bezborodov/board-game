import bodyParser from "body-parser";
import bcrypt from "bcrypt-nodejs";
import cors from "cors";
import express from "express";
import {AuthController} from "./controller/auth.controller";
import {ConversationController} from "./controller/conversation.controller";
import {FileController} from "./controller/file.controller";
import {GameController} from "./controller/game.controller";
import {MessageController} from "./controller/message.controller";
import {PatternController} from "./controller/pattern.controller";
import {UserController} from "./controller/user.controller";
import {Role} from "./enum/role";
import {UserRepository} from "./repository/user.repository";
import {AuthService} from "./service/auth.service";
import {SocketService} from "./service/socket.service";

const app = express();
const port = 8080;
const io = require('socket.io').listen(8081);
io.set('log level', 1);
SocketService.setIo(io);

const publicRoutes = [
    "/api/signin",
    "/api/signup"
];

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api/static', express.static('files'));

app.use((req: any, res, next) => {
    if (publicRoutes.includes(req._parsedUrl.pathname) || req._parsedUrl.pathname.includes('static')) {
        next();
        return;
    }

    const authorization = req.header("Authorization");

    try {
        const payload: any = AuthService.checkAuthorization(authorization ? authorization : "");
        req.query.currentUserId = payload.id;
    } catch (e) {
        res.status(401).send("Unauthorized.");
        return;
    }

    next();
});

app.use("/api/", new AuthController().getRouter())
    .use("/api/games", new GameController().getRouter())
    .use("/api/users", new UserController().getRouter())
    .use("/api/patterns", new PatternController().getRouter())
    .use("/api/files", new FileController().getRouter())
    .use("/api/conversations", new ConversationController().getRouter())
    .use("/api/messages", new MessageController().getRouter());

app.use((err: any, req: any, res: any, next: any) => {
    console.error(err.stack);
    res.status(500).send(err.message);
});

app.use((req, res) => {
    res.status(404).send('Sorry cant find that!');
});

app.listen(port, async () => {

    const salt = bcrypt.genSaltSync(12);
    const hashedPassword = bcrypt.hashSync("admin123", salt);

    const admin = await UserRepository.findByEmail("admin@mail.com");

    if (!admin) {
        await UserRepository.create({
            _id: null,
            name: 'admin',
            email: "admin@mail.com",
            password: hashedPassword,
            role: Role.ADMIN,
            avatar: '',
            gameAdminInfo: '',
            country: '',
            city: ''
        });
    }

    console.log(`server started at http://localhost:${port}`);
});
