require('dotenv').config()
const express = require("express");
const session = require("express-session");
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const config = require('./config/config')
const cors = require('cors')
const http = require('http');
const db = require('./database/models');
const authRoute = require('./routes/authRoute');
const twitchRoutes = require('./routes/twitchRoutes');
const openAiApiRoutes = require('./routes/openAiApiRoutes');
const databaseRoutes = require('./routes/databaseRoutes');
const awsRoutes = require('./routes/awsRoutes');
const initializeWebsocketServer = require('./websockets/subSmashWebsocket/websocketServer');
const cronJobs = require('./cronJobs')
//TEST
const testRoutes = require('./tests/testRoutes');

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.static('images'));

const sessionStore = new SequelizeStore({
    db: db.sequelize,
});

app.use(session({
    secret: config.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: config.IS_PRODUCTION,
        domain: '.subsmash.io',
        maxAge: 1000 * 60 * 60 * 24 * 7
     }
}));

app.use(
    cors({
        origin: config.FRONTEND_URL,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type"],
        credentials: true,
    })
);

app.use(authRoute);
app.use(twitchRoutes);
app.use(openAiApiRoutes);
app.use(databaseRoutes);
app.use(awsRoutes);
//TEST
app.use(testRoutes);

app.get('/', (req, res) => {
    res.status(200).json({ message: "the server is running" });
})

initializeWebsocketServer(server);

db.sequelize.sync({ alter: true }).then(() => {
    console.log("Database synchronized");
    server.listen(config.PORT);
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

cronJobs.validateTokensHourly();
cronJobs.cleanupTwitchWebsocketConnections();