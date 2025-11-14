"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
/*
    $ cp .env-sample .env
    $ npm init -y
    $ npm i express dotenv mongoose express-async-errors
    $ npm i morgan swagger-autogen swagger-ui-express redoc-express
    $ mkdir logs
    $ nodemon
*/
const express = require('express')
const app = express()

/* ------------------------------------------------------- */
// Required Modules:

// envVariables to process.env:
require('dotenv').config()
const PORT = process.env?.PORT || 8000

// qeury parse was 'extended' with v5 it is using built in libriray which 'qs(querystring)'
// extended -> ?a[b]=1 = { a: { b:1 }} & qs -> ?a[b]=1 = { 'a[b]':1 }
app.set('query parser', 'extended');

/* ------------------------------------------------------- */
// Configrations:

// Connect to DB:
const { dbConnection } = require('./src/configs/dbConnection')
dbConnection()

/* ------------------------------------------------------- */
// Middlewares:

// Accept JSON:
app.use(express.json())

// Logger:
app.use(require('./src/middlewares/logger'))

// Auhentication:
app.use(require('./src/middlewares/authentication'))

// findSearchSortPage / res.getModelList:
app.use(require('./src/middlewares/queryHandler'))

/* ------------------------------------------------------- *
// E-MAIL
// npm i nodemailer

const nodemailer = require('nodemailer');

/* Send email with etheral(fake) email *

// Create Test Account:
// nodemailer.createTestAccount().then(email => console.log(email));
// {
//     user: 'lcvbbrhlvbw3rlo3@ethereal.email',
//     pass: '5t39CbRyRM4s9HpXxd',
//     smtp: { host: 'smtp.ethereal.email', port: 587, secure: false },
//     imap: { host: 'imap.ethereal.email', port: 993, secure: true },
//     pop3: { host: 'pop3.ethereal.email', port: 995, secure: true },
//     web: 'https://ethereal.email',
//     mxEnabled: false
// }

// Connect to MailServer / STMP:
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
        user: 'lcvbbrhlvbw3rlo3@ethereal.email',
        pass: '5t39CbRyRM4s9HpXxd',
    }
});

// Send Mail:
transporter.sendMail({
    from: 'lcvbbrhlvbw3rlo3@ethereal.email',
    to: 'info@clarusway.com',
    subject: 'Hi There',
    html: "<p style='text-color:red' >Hello there, how are you <b>today</b> </p>",
    text: "Hello there, \n how are you today"
}, function (error, success) {
    success ? console.log('SUCCESS:', success) : console.log('ERROR:', error);
});

/* Send email with etheral(fake) email */

/* Send email with gmail service *
// GoogleMail (gmail)

// Google -> AccountHome -> Security -> Two-Step-Verify (make it on) -> App-Passwords (if not showing use this link: https://myaccount.google.com/apppasswords)

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'alidrl26@gmail.com',
        pass: 'ppde caqm zhfz huqv',
    }
});

// Send Mail:
transporter.sendMail({
    from: 'alidrl26@gmail.com',
    to: 'info@clarusway.com',
    subject: 'Hi There',
    html: "<p style='text-color:red' >Hello there, how are you <b>today</b> </p>",
    text: "Hello there, \n how are you today"
}, function (error, success) {
    success ? console.log('SUCCESS:', success) : console.log('ERROR:', error);
});

/* Send email with gmail service */

/* Send email with yandex service *
const transporter = nodemailer.createTransport({
    service: 'yandex',
    auth: {
        user: 'alidrl26@gmail.com',
        pass: '--yourPersonalPassword--',
    }
});

// Send Mail:
transporter.sendMail({
    from: 'alidrl26@gmail.com',
    to: 'info@clarusway.com',
    subject: 'Hi There',
    html: "<p style='text-color:red' >Hello there, how are you <b>today</b> </p>",
    text: "Hello there, \n how are you today"
}, function (error, success) {
    success ? console.log('SUCCESS:', success) : console.log('ERROR:', error);
});

/* Send email with yandex service */

/* ------------------------------------------------------- */
// Routes:

// routes/index.js:
app.use('/', require('./src/routes'))

// HomePath:
app.all('/', (req, res) => {
    res.send({
        error: false,
        message: 'Welcome to PIZZA API',
        docs: {
            swagger: "/documents/swagger",
            redoc: "/documents/redoc",
            json: "/documents/json",
        },
        user: req.user,
    })
});

// Static Route
app.use('/images', express.static('./uploads'));

/* ------------------------------------------------------- */

// errorHandler:
app.use(require('./src/middlewares/errorHandler'))

// RUN SERVER:
app.listen(PORT, () => console.log('http://127.0.0.1:' + PORT))

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')() // !!! It clear database.