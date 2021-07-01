import express from 'express';
import {json} from 'body-parser';

import mongoose from 'mongoose';
import cookieSession from "cookie-session";

import {currentUserRouter} from "./routes/current-user";
import {signupRouter} from "./routes/signup";
import {signinRouter} from "./routes/signin";
import {signoutRouter} from "./routes/signout";

import {errorHandler} from "./middlwares/error-handler";

const app = express();
app.use(json())
app.use(cookieSession({
    signed: false, // non encrypted
    secure: true // TLS
}));

app.use(currentUserRouter)
app.use(signupRouter)
app.use(signinRouter)
app.use(signoutRouter)

app.use(errorHandler)

app.set('trust proxy', 1);

const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined.')
    }

    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
    } catch (err) {
        console.error(err);
    }
    console.log("Connected to MongoDb");
    app.listen(3000, () => {
        console.log("Listening at 3000 port!!!");
    })
};

start();
