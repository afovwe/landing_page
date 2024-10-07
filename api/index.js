import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import userRouter from './routes/user.route.js';
import clientRoutes from './routes/client.js';
import generalRoutes from './routes/general.js';
import managementRoutes from './routes/management.js';
import salesRoutes from './routes/sales.js';
import navigationRouter from './routes/navigation.route.js';

dotenv.config();

/* CONFIGURATION */
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // Exit the process if unable to connect to MongoDB
  }
};
// Call the function to connect to MongoDB
connectDB();

// Serve static files from the 'dist' directory
 const __dirname = path.resolve();
 app.use(express.static(path.join(__dirname, '/client/dist')));

// Use routes
app.use('/api', userRouter);
app.use('/api', navigationRouter);
/* ROUTES */
app.use('/api', clientRoutes);
app.use('/api', generalRoutes);
app.use('/api', managementRoutes);
app.use('/api', salesRoutes);

// Serve the index.html file for any other requests
 app.get('*', (req, res) => {
   res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
