import express from 'express';
import dotenv from 'dotenv'
import cookieParser from "cookie-parser"
import authRoutes from './routes/auth.route.js'
import registrationRoutes from './routes/reg.route.js';
import { connectDB } from './lib/db.js';
import cors from 'cors'

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true 
}));

app.use('/api/auth',authRoutes);
app.use('/api/reg',registrationRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
    connectDB();
})