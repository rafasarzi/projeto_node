import { Router } from 'express';

const routes = Router();

routes.get('/', (request, response) =>
response.json({ message: 'TESTE server...........' }));

export default routes;
