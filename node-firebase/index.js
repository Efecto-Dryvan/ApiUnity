import express from 'express';
import cors from 'cors';

import config from './config.js';
import userRoute from './routes/userRoute.js';
import gameRoute from './routes/gameRoute.js';
import objectRoute from './routes/objectRoute.js';

const app = express();

const version = "v1.0.0";

app.use(cors());
app.use(express.json());

// Routes
app.use('/user', userRoute);
app.use('/game', gameRoute);
app.use('/object', objectRoute);

// Route for version
app.get('/version', (req, res) => {
  res.status(200).json({ version });
});

app.listen(config.port, () =>
  console.log(`Server is live on port @ ${config.port}`),
);