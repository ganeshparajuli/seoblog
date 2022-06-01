const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
//brings routes
const blogRoutes =require('./routes/blog')
const authRoutes =require('./routes/auth')

// app
const app = express();

// db
mongoose
    .connect(process.env.DATABASE_CLOUD, { useNewUrlParser: true})
    .then(() => console.log('DB connected'))
    .catch(err => {s
        console.log(err);
    });

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
// cors
if (process.env.NODE_ENV === 'development') {
    app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());


// routes
app.get('/api', (req, res) => {
    res.json({ time: Date().toString() });
});
// routes middlewre
app.use('/api', blogRoutes);
app.use('/api', authRoutes);

// port
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
