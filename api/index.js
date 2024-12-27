// index.js
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
import authRouter from './routes/auth.route.js';
import heroSectionRoutes from './routes/heroSectionRoutes.js';
import popularProductRoutes from './routes/popularProducts.js';
import superQualityRoutes from './routes/superQuality.js';
import serviceRoutes from './routes/service.js';
import specialOfferRoutes from './routes/specialOffer.js';
import customerReviewRoutes from './routes/customerReview.js';
import subscribeRoutes from './routes/subscribe.js';

dotenv.config();

/* CONFIGURATION */
const app = express();
app.use(express.json());

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          "'unsafe-eval'",
          "https://clerk.com",
          "https://*.clerk.com",
          "https://challenges.cloudflare.com",
          "https://cdn.jsdelivr.net",
        ],
        connectSrc: [
          "'self'",
          "https:",
          "http:",
          "https://clerk.com",
          "https://*.clerk.com",
        ],
        imgSrc: ["'self'", "data:", "https:", "https://img.clerk.com"],
        workerSrc: ["'self'", "blob:"],
        styleSrc: ["'self'", "'unsafe-inline'", "https:"],
        fontSrc: ["'self'", "https:", "data:"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
        frameAncestors: ["'none'"],
        frameSrc: ["'self'", "https://challenges.cloudflare.com"],
      },
    },
  })
);

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
connectDB();

// Serve static files from the 'dist' directory
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/client/dist')));

// Use routes
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/navigation', navigationRouter);
app.use('/api/client', clientRoutes);
app.use('/api/general', generalRoutes);
app.use('/api/management', managementRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/herosections', heroSectionRoutes);
app.use('/api/popular-products', popularProductRoutes);
app.use('/api/super-quality', superQualityRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/special-offer', specialOfferRoutes);
app.use('/api/customer-reviews', customerReviewRoutes);
app.use('/api/subscribe', subscribeRoutes);

// Serve the index.html file for any other requests
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
