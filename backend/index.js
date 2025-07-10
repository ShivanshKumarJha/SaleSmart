import * as path from 'path';
import * as fs from 'fs';
import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';

import routes from './routes/index.js';
import { connectDB } from './config/db.js';
import { PORT } from './config/environments.js';
import { BASE_URL } from './utils/BASE_URL.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const corsOptions = {
  origin: BASE_URL,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Content-Disposition'],
  exposedHeaders: ['Content-Disposition'],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

const imagesDir = path.join(__dirname, 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
