import { Router } from 'express';
import ensureAuthenticaded from '@modules/users/infra/http/middlewares/ensureAuthenticaded';
import ProvidersController from '../controllers/ProvidersController';

const providerRouter = Router();
const providersController = new ProvidersController();

providerRouter.use(ensureAuthenticaded);

providerRouter.get('/', providersController.index);

export default providerRouter;
