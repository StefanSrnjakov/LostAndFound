import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
// Middleware for parsing JSON
app.use(express.json());

// Routes
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));


// Database connection
console.log(process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ts-express-mongo')
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Example route
app.get('/', (req, res) => {
  res.send(`Server is listening on this endpoints: `);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
