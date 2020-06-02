import { Router } from 'express';
import usersRouter from '@modules/users/http/routes/users.routes';
import appointmentRouter from '@modules/appointments/infra/http/appointments.routes';
import sessionsRouter from '@modules/users/http/routes/sessions.routes';

const routes = Router();

routes.use('/appointments', appointmentRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
