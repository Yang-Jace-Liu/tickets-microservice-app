import express, {NextFunction} from 'express';
import jwt from "jsonwebtoken";
import {body} from 'express-validator';
import {User} from "../models/user";
import {BadRequestError} from "../errors/bad-request-error";
import {validateRequest} from "../middlwares/validate-request";

const router = express.Router()

router.post('/api/users/signup', [
    body('email').isEmail().withMessage("Email must be valid"),
    body('password').trim().isLength({min: 4, max: 20}).withMessage("Password must be between 4 and 20 characters")
], validateRequest, async (req: express.Request, res: express.Response, next: NextFunction) => {
    const {email, password} = req.body;

    const existingUser = await User.findOne({email});

    if (existingUser) {
        return next(new BadRequestError("Email in use"));
    }

    const user = User.build({email, password});
    await user.save();

    //Generate JsonWebToken
    const userJwt = jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.JWT_KEY!);

    // set cookie
    req.session = {
        jwt: userJwt
    };

    res.status(201).send(user);
});


export {router as signupRouter}
