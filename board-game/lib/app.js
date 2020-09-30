"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const bcrypt_nodejs_1 = __importDefault(require("bcrypt-nodejs"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./controller/auth.controller");
const conversation_controller_1 = require("./controller/conversation.controller");
const file_controller_1 = require("./controller/file.controller");
const game_controller_1 = require("./controller/game.controller");
const message_controller_1 = require("./controller/message.controller");
const pattern_controller_1 = require("./controller/pattern.controller");
const user_controller_1 = require("./controller/user.controller");
const role_1 = require("./enum/role");
const user_repository_1 = require("./repository/user.repository");
const auth_service_1 = require("./service/auth.service");
const socket_service_1 = require("./service/socket.service");
const app = express_1.default();
const port = 8080;
const io = require('socket.io').listen(8081);
io.set('log level', 1);
socket_service_1.SocketService.setIo(io);
const publicRoutes = [
    "/api/signin",
    "/api/signup"
];
app.use(cors_1.default());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use('/api/static', express_1.default.static('files'));
app.use((req, res, next) => {
    if (publicRoutes.includes(req._parsedUrl.pathname) || req._parsedUrl.pathname.includes('static')) {
        next();
        return;
    }
    const authorization = req.header("Authorization");
    try {
        const payload = auth_service_1.AuthService.checkAuthorization(authorization ? authorization : "");
        req.query.currentUserId = payload.id;
    }
    catch (e) {
        res.status(401).send("Unauthorized.");
        return;
    }
    next();
});
app.use("/api/", new auth_controller_1.AuthController().getRouter())
    .use("/api/games", new game_controller_1.GameController().getRouter())
    .use("/api/users", new user_controller_1.UserController().getRouter())
    .use("/api/patterns", new pattern_controller_1.PatternController().getRouter())
    .use("/api/files", new file_controller_1.FileController().getRouter())
    .use("/api/conversations", new conversation_controller_1.ConversationController().getRouter())
    .use("/api/messages", new message_controller_1.MessageController().getRouter());
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(err.message);
});
app.use((req, res) => {
    res.status(404).send('Sorry cant find that!');
});
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    const salt = bcrypt_nodejs_1.default.genSaltSync(12);
    const hashedPassword = bcrypt_nodejs_1.default.hashSync("admin123", salt);
    const admin = yield user_repository_1.UserRepository.findByEmail("admin@mail.com");
    if (!admin) {
        yield user_repository_1.UserRepository.create({
            _id: null,
            name: 'admin',
            email: "admin@mail.com",
            password: hashedPassword,
            role: role_1.Role.ADMIN,
            avatar: '',
            gameAdminInfo: '',
            country: '',
            city: ''
        });
    }
    console.log(`server started at http://localhost:${port}`);
}));
//# sourceMappingURL=app.js.map