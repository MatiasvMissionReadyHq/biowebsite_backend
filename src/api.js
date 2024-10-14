const express = require('express');
const serverless = require('serverless-http');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const dotenv = require('dotenv'); // remember to do npm install dotenv
dotenv.config();

const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
// Middleware to parse JSON and form data
app.use(bodyParser.json()); // to handle JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // to handle URL-encoded bodies


const router = express.Router();

// Define your API endpoint
router.get('/', (req, res) => {
    res.send('App is running..');
  });

// 1. Creating a transport - this is the configuration for your email
const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    auth: {
        user: process.env.EMAIL_ACCOUNT,
        pass: process.env.EMAIL_PASS,
    },
        tls: {
        rejectUnauthorized: false
    }
});

router.post("/api", (req, res) => {

    const mailOptions = {
        from: process.env.EMAIL_ACCOUNT,
        to: process.env.EMAIL_ACCOUNT,
        subject: req.body.subject,
        html: 'Mensaje del email '+req.body.email+': '+req.body.message
    };
    console
    transporter.sendMail(mailOptions, (error, info) => {

        console.log("error", error);
        if(error){
            return res.status(500).send(error);
        }
        res.status(200).send("Email sent successfully");
    });
});

app.use('/.netlify/functions/api', router);
// Export the app as a serverless function
module.exports.handler = serverless(app);
