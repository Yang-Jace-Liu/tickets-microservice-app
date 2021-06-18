import express from 'express';
import {body, validationResult} from 'express-validator';

const router = express.Router()

router.post('/api/users/signup', [
    body('email').isEmail().withMessage("Email must be valid"),
    body('password').trim().isLength({min: 4, max: 20}).withMessage("Password must be between 4 and 20 characters")
], (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new Error("Invalid email or password");
    }
    const {email, password} = req.body;

    console.log('Create a user ...');
    throw new Error("Error connecting to dataset");

    res.send({})
});


export {router as signupRouter}
