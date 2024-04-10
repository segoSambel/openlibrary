import express from "express";
import {authMiddleware} from "../middleware/auth-middleware";
import {UserController} from "../controller/user-controller";
import {AuthorController} from "../controller/author-controller";

export const apiRouter = express.Router();
apiRouter.use(authMiddleware);

// User API
apiRouter.get('/api/users/current', UserController.get);
apiRouter.patch('/api/users/current', UserController.update);

// Author API
apiRouter.post('/api/authors', AuthorController.create);
