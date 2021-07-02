import express, {NextFunction, Request, Response} from 'express';
import jwt from "jsonwebtoken";

const router = express.Router()

router.get('/api/users/currentuser', (req: Request, res: Response, next: NextFunction) => {
    if (!req.session?.jwt) {
        return res.status(200).send({currentUser: null});
    }

    const token = req.session.jwt;
    try {
        const payload = jwt.verify(token, process.env.JWT_KEY!);
        res.send({currentUser: payload});
    } catch (err) {
        return res.status(200).send({currentUser: null});
    }
});


export {router as currentUserRouter}
