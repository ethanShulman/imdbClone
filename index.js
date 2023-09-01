const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { user } = require('./models');
const path = require('path');
const bcrypt = require('bcrypt');
const plaintextPassword = 'mypassword';
const saltRounds = 10;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
// app.use('/static', express.static('public'));
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '/public')))


// bcrypt.hash(plaintextPassword, saltRounds, (err, hash) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log('Hashed password:', hash);
// });

const userEnteredPassword = 'mypassword';
const storedHashedPassword = '...'; // this is the password that is stored in the database

// bcrypt.compare(userEnteredPassword, storedHashedPassword, (err, result) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   if (result) {
//     console.log('Passwords match!');
//   } else {
//     console.log('Passwords do not match.');
//   }
// });


app.get('/', (req, res) => {
    res.render('register')
    // res.send("Hello World")
    
});

app.put('/', (req, res) => {

});


app.post('/register', async (req, res) => {
    const { name, email, password, passwordCheck } = req.body;
    // const existingUser = await user.findOne({ where: { email } })

    // if(existingUser){
        // res.status(400).json({
            // error: 'Email is already in use'
        // })
    // }

    if(req.body.password !== req.body.passwordCheck){
        res.status(400).json({
            error:'passwords must match'
        });
    }

    await user.create({
    name,
    email,
    password
})
    
    
    res.render('register');
});

app.delete('/', (req, res) => {
    
});

app.listen(3001, () =>{
    console.log('Server is running on port 3001')
});