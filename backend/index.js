import express from 'express';
import cors from 'cors';

import routes from './routes/index.js';
import {connectDB} from "./config/db.js";
import {PORT} from "./config/environments.js";

const app = express();
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: "50mb", extended: true}));

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    connectDB();
})