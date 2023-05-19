import { Router } from 'express';
import MatchController from '../controller/MatchController';
import validateToken from '../middleware/validateToken';

const matchRouter = Router();
const matchController = new MatchController();

matchRouter.get('/', (req, res) => matchController.findAllMatches(req, res));
matchRouter.patch('/:id/finish', validateToken, (req, res) =>
  matchController.updateOnGoingMatches(req, res));

export default matchRouter;
