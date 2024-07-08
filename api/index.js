import express from 'express';
import dotenv from 'dotenv';
import path from 'path'; // Import path module
import userRouter from './routes/user.route.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the 'dist' directory
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/client/dist')));

// Use routes
app.use('/api', userRouter);

// Serve the index.html file for any other requests
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
