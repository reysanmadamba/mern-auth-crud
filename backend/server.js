const express =require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config();

const app = express();


app.use(express.json());
app.use(cors());

const userRoutes = require('./routes/userRoutes')
app.use('/api/users', userRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected');
        app.listen(process.env.PORT, () => {
            console.log(`server running on port ${process.env.PORT} `)
        })
    })
    .catch((err) => console.error(`connection failed`, err));