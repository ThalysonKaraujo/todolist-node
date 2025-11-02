import express from 'express';
import 'dotenv/config';
import { todosRoutes } from './routes/todos.routes.js';
import { authRoutes } from './routes/auth.routes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use('/todos', todosRoutes);
app.use('/auth', authRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
