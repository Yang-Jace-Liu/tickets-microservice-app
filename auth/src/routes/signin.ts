import express from 'express';
import {body} from "express-validator";
import {validateRequest} from "../middlwares/validate-request";

import {User, UserDoc} from "../models/user";
import {BadRequestError} from "../errors/bad-request-error";
import {Password} from "../services/password";
import jwt from "jsonwebtoken";

const router = express.Router()

router.post('/api/users/signin', [
    body('email').isEmail().withMessage("Email must be valid"),
    body('password').trim().notEmpty().withMessage("You must supply a password")
], validateRequest, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const {email, password} = req.body;
    const existingUser: UserDoc | null = await User.findOne({email});
    if (!existingUser) {
        next(new BadRequestError('Invalid credentials'));
        return;
    }

    const passwordMatch = await Password.compare(existingUser.password, password);
    if (!passwordMatch) {
        next(new BadRequestError('Invalid credentials'));
        return;
    }

    //Generate JsonWebToken
    const userJwt = jwt.sign({
        id: existingUser.id,
        email: existingUser.email
    }, process.env.JWT_KEY!);

    // set cookie
    req.session = {
        jwt: userJwt
    };

    res.status(200).send(existingUser);
});


export {router as signinRouter}
