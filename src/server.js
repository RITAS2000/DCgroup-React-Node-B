import express from 'express';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';
import router from './routers/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import cookieParser from 'cookie-parser';
import path from 'node:path';
import swaggerUI from 'swagger-ui-express';
import * as fs from 'node:fs';

const SWAGGER_DOCUMENT = JSON.parse(
  fs.readFileSync(path.join('docs', 'swagger.json')),
);

const PORT = process.env.PORT || getEnvVar('PORT', '8080');

const frontendUrl = [
  'https://d-cgroup-project-f1-x2.vercel.app',
  'http://localhost:5173',
];

export function setupServer() {
  const app = express();
  app.use(express.json());
  app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin || frontendUrl.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true,
    }),
  );

  app.use(cookieParser());

  app.use('/api', router);
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(SWAGGER_DOCUMENT));
  app.use(notFoundHandler);
  app.use(errorHandler);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
