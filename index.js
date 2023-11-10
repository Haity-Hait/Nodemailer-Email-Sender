const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
app.use(bodyParser.json({ limit: '100mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: "100mb" }));
app.use(express.json());
const nodemailer = require("nodemailer")
app.use(cors({ origin: "*" }))

app.post("/", (req, res) => {
    const { fullName, email, message } = req.body;
    const template = `${message},
    Here's my email: ${email}
    `
    // Send Mail
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "haityhait47@gmail.com",
            pass: "iota xghf nwhp eyuc"
        }
    });

    const mailOptions = {
        from: email,
        to: "haityhait47@gmail.com",
        subject: `Portfolio Message from ${fullName}`,
        html: template
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(401).json({message:"Email not sent reload the page and input your details again."});
        } else {
            res.status(201).json({ message: "Contact form submitted submitted sucessfully" })
        }
    })
})

app.listen(2005, () => {
    console.log("running ");
})