import express from 'express';
import '@dotenvx/dotenvx/config'
import router from './router/route.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(cors());
app.use(router);

app.listen(PORT, () => {
  console.log(`🚀 Log API server running at http://localhost:${PORT}`);
});
