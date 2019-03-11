const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = 6699;
const app = express();
const authRouter = require('./api/auth/router');
const userRouter = require('./api/users/router');
const trackRouter = require('./api/tracks/router');
const artistRouter = require('./api/artists/router');
const albumRouter = require('./api/albums/router');
const config = require('./config-local.json');
// const UserApi = require('./routers/userApi');

mongoose.connect(config.mongoPath,
    { useNewUrlParser: true },
    (err) => {
        if(err) console.log(err);
        else console.log('DB connected successfully!');
    }
)

app.use(session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: config.sessionSecure,
        maxAge: 12 * 60 * 60 * 1000
    }
}))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: false }));

// app.use("/api/auth", authRouter);
app.use('/api/auth', authRouter)
app.use("/api/tracks", trackRouter);
app.use("/api/albums", albumRouter);
app.use("/api/artists", artistRouter);
app.use("/api/users", userRouter);

app.listen(port, (err) => {
    if(err) console.log(err);
    else console.log('Listening at port ' + port);
})