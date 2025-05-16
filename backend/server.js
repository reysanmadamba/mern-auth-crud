const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const router = require('../backend/routes/noteRoutes')

dotenv.config();

const app = express();


app.use(express.json());
app.use(cors());

// app.use(cors({
//     origin: '*'
// }))

const userRoutes = require('./routes/userRoutes')
const noteRoutes = require('./routes/noteRoutes')

app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected');
        app.listen(process.env.PORT, () => {
            console.log(`server running on port ${process.env.PORT} `)
        })
    })
    .catch((err) => console.error(`connection failed`, err));