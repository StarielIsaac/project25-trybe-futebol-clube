import { Router } from 'express';

const teamRouter = Router();

teamRouter.get('/', (req, res) => console.log('io'));

export default teamRouter;
