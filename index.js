const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { user } = require('./models');
const path = require('path');
const bcrypt = require('bcrypt');
const saltRounds = 10;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname, '/public')))


app.post('/log_in', async (req, res) => {
    const { email, password } = req.body;
    const existingUser = await user.findOne({ where: { email } })
    
    if (!existingUser){
        res.status(400).json({
            error: 'No user with that email was found.'
        })
    } 

    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch) {
        return res.status(400).json({
            error: 'Incorrect Password'
        });
    }

    res.render('login')
});

app.put('/', (req, res) => {

});


app.post('/register', async (req, res) => {
    const { name, email, password, passwordCheck } = req.body;
    const existingUser = await user.findOne({ where: { email } });

    if (existingUser) {
        return res.status(400).json({
            error: 'Email is already in use'
        });
    }

    if (password !== passwordCheck) {
        return res.status(400).json({
            error: 'Passwords must match'
        });
    }

    bcrypt.hash(password, saltRounds, (hash) => {
        user.create({
                name,
                email,
                password: hash 
            })
            .then(() => {
                res.render('register');
            })
    });
});


app.delete('/', (req, res) => {
    
});

app.listen(3001, () =>{
    console.log('Server is running on port 3001')
})