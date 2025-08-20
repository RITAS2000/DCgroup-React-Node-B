import express from 'express';
import cors from 'cors';
// import pino from 'pino-http';
import { getEnvVar } from './utils/getEnvVar.js';

import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
// import cookieParser from 'cookie-parser';

import path from 'node:path';
import swaggerUI from 'swagger-ui-express';
import * as fs from 'node:fs';
import recipesRouter from './routers/recipes.js';

const SWAGGER_DOCUMENT = JSON.parse(
  fs.readFileSync(path.join('docs', 'swagger.json')),
);

const PORT = process.env.PORT || getEnvVar('PORT', '8080');

export function setupServer() {
  const app = express();
  app.use(express.json());
  app.use(cors());
  // app.use(
  //   pino({
  //     transport: {
  //       target: 'pino-pretty',
  //     },
  //   }),
  // );

  // app.use(cookieParser());
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(SWAGGER_DOCUMENT));
  app.use('/api/recipes', recipesRouter);
  app.use(notFoundHandler);
  app.use(errorHandler);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
