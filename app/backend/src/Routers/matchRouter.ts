import { Router } from 'express';
import MatchController from '../controller/MatchController';

const matchRouter = Router();
const matchController = new MatchController();

matchRouter.get('/', (req, res) => matchController.findAllMatches(req, res));

export default matchRouter;
