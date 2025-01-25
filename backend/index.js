import express from 'express';

import routes from './routes/route.js'
import {connectDB} from "./config/db.js";
import {PORT} from "./config/environments.js";

const app = express();
app.use(express.json());
app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDB();
})