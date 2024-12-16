import popularProductRoutes from './routes/popularProducts.js';

// ... other middleware ...

// Make sure this line is before mongoose setup
app.use('/api/popular-products', popularProductRoutes); 