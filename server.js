const express = require('express');
const sendMail = require('./mail');
const mongoose = require('mongoose');
require("dotenv").config();
const methodOverride = require('method-override');
const path = require('path');
const Info = require('./models/Info');

const app = express();

const PORT = process.env.PORT;
const URI = process.env.MONGODB_URL;

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
}
);

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
app.use(methodOverride('_method'));



app.get('/', (req, res) => {
    res.render('index');
});

app.get('/submit', (req, res) => {
    res.render("index");
}
);

app.post('/submit', async (req, res) => {
    //saving to database
    const info = new Info({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
        project: req.body.project
    });
    
    await info.save()

    //TODO: 
    //send email here
    const { name, email, project, message } = req.body;
    console.log('Data: ', req.body);

    sendMail(name, email, project, message, (err, data) => {
        if (err) {
            res.status(500).json({message: 'Error sending email'});
        } else {
            res.json({ message: 'Email sent' });
        }
        
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected');
}
);
