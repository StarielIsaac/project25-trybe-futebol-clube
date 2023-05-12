import { Router } from 'express';
import TeamController from '../controller/TeamController';

const teamRouter = Router();
const teamController = new TeamController();

teamRouter.get('/', (req, res) => teamController.findAllTimes(req, res));
teamRouter.get('/:id', (req, res) => teamController.findById(req, res));
export default teamRouter;
