import express from "express";
import {authMiddleware} from "../middleware/auth-middleware";
import {UserController} from "../controller/user-controller";
import {AuthorController} from "../controller/author-controller";
import {PublisherController} from "../controller/publisher-controller";

export const apiRouter = express.Router();
apiRouter.use(authMiddleware);

// User API
apiRouter.get('/api/users/current', UserController.get);
apiRouter.patch('/api/users/current', UserController.update);

// Author API
apiRouter.post('/api/authors', AuthorController.create);
apiRouter.get('/api/authors/:id', AuthorController.get);
apiRouter.put('/api/authors/:id', AuthorController.update);
apiRouter.delete('/api/authors/:id', AuthorController.delete);

// Publisher API
apiRouter.post('/api/publishers', PublisherController.create);
apiRouter.get('/api/publishers/:id', PublisherController.get);
apiRouter.put('/api/publishers/:id', PublisherController.update);
