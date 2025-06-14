import express from 'express';
import { createServer } from 'http';

import { env, useCors, useBodyParser, useCompression } from '@/config/index.js';
import useRoutes from '@/routes/routes.js';

const app = express();
app.disable('x-powered-by');

useCors(app);
useCompression(app);
useBodyParser(app);
useRoutes(app);

const server = createServer(app);

server.listen(env.PORT, env.HOST, () => {
	console.log(`Listen http://${env.HOST}:${env.PORT}`);
});
