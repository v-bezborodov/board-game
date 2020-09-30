const mongoose = require('mongoose');

(mongoose as any).Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/board-games", {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set("useFindAndModify", false);

export {mongoose};
