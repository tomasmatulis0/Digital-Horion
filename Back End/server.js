const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: '123456',
    database: 'reminderdb'
    }
});

const app = express();
app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('working');
})

// User registration - POST /user
app.post('/user', (req, res) => {
    const { email, password, name} = req.body;
    const hash = bcrypt.hashSync(password);
    db('users').insert({
        email: email,
        password: hash,
        name: name
    }).then(stat => {
        res.json('User registered!');
    }).catch(err => res.status(400).json('User already exist!'));
})

// User login - POST /user/login
app.post('/user/login', (req, res) => {
    db.select('email', 'password').from('users')
    .where('email', '=', req.body.email)
    .then(data => {
        const isValid = bcrypt.compareSync(req.body.password, data[0].password);
        if (isValid) {
            db. select('*').from('users')
            .where('email', '=', req.body.email)
            .then(user => {
                res.json(user[0]);
            }).catch(err => res.status(400).json('Unable to get user!'))
        } else {
            res.status(400).json('Wrong login information!')
        }
    }).catch(err => res.status(400).json('Wrong login information!'));
})

// Create reminder for logged in User - 
// POST /user/{USER_ID}/reminder
app.post('/user/:userid/reminder', (req, res) => {
    const { title, message, remindat, emailsent} = req.body;
    db('reminder').insert({
        title: title,
        message: message,
        userid: Number(req.params.userid),
        created: new Date,
        remindat: remindat,
        emailsent: emailsent
    }).then(stat => {
        res.json('Reminder added!');
    }).catch(err => res.status(400).json('Reminder cannot be added!'));
})

// Edit reminder for logged in User - 
// PATCH /user/{USER_ID}/reminder/{REMINDER_ID}
app.put('/user/:userid/reminder/:reminderid', (req, res) => {
    const { title, message, remindat} = req.body;
    db('reminder')
    .where('id', '=', req.params.reminderid)
    .update({
        title: title,
        message: message,
        remindat: remindat
    }).then(stat => {
        res.json('Reminder eddited!');
    }).catch(err => res.status(400).json('Unable to edit the reminder!'));
})

// Delete reminder for logged in User - 
// DELETE /user/{USER_ID}/reminder/{REMINDER_ID}
app.delete('/user/:userid/reminder/:reminderid', (req, res) => {
    db('reminder')
    .where('id', '=', req.params.reminderid)
    .del()
    .then(stat => {
        res.json('Reminder deleted!');
    }).catch(err => res.status(400).json('Failled to delete the reminder!'));
})

// List reminders for logged in User - 
// GET /user/{USER_ID}/reminder
app.get('/user/:userid/reminder', (req, res) => {
    db.select('*').from('reminder')
    .where('userid', '=', req.params.userid)
    .then(data => {
        if (data.length){
            res.json(data);
        }else {
            res.status(400).json('Not found!');
        }
    }).catch(err => res.status(400).json(`Can't get reminders!`));
})

// Filter reminders by date - 
// GET /user/{USER_ID}/reminder?QUERY
app.get('/user/:userid/reminder?QUERY', (req, res) => {
    db.select('*').from('reminder')
    .whereBetween('remindat', ['2017-03-01', '2017-06-01'])
    .andWhere('userid', '=', req.params.userid)
    .then(data => {
        if (data.length){
            res.json(data);
        }else {
            res.status(400).json('Not found!');
        }
    }).catch(err => res.status(400).json('Error while filtering!'))
})

app.listen(3000)