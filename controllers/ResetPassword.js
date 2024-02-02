const sgMail = require('@sendgrid/mail')
const User = require('../models/User')
const jwt = require('jwt-simple');
require("dotenv").config();


sgMail.setApiKey(process.env.SEND_GRID_API_KEY)

const sendEmail = async (receiver, source, subject, content) => {
    const message = {
        to: receiver,
        from: source,
        subject: subject,
        html: content,
    }

    await sgMail.send(message)
        .then(res => console.log({ result: res, msg: 'Email sent...' }))
        .catch(err => console.log(err.message))
}

exports.sendResetLink = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(404).send({ error: 'User email not found !' })
        }
        const timestamp = new Date().getTime();
        const token = jwt.encode({ sub: user.id, iat: timestamp }, process.env.TOKEN_KEY);
        user.reset_token = token;
        await user.save()
        const link = `${req.protocol}://localhost:3000/reset-password?token=${token}`
        await sendEmail(
            email,
            'wacef.stratrait@gmail.com',
            'Change Password',
            `<div>Click the link below to reset your password</div><br/>
           <div>${link}</div>`
        )
        return res.status(200).send({
            message: 'Password reset link has been successfully sent to your inbox',
            token: token,
            email: user.email
        });
    } catch (e) {
        console.log(e)
        return new Error(e)
    }
}

exports.resetPassword = async (req, res) => {

    const { email } = req.body

    const user = await User.findOne({ where: { email } })
    if (!user) {
        return res.status(404).send({ error: 'User email not found !' })
    }

    await User.findById(user._id)
        .then(u => {
            console.log(u)
            // u.password = req.body.password;
            // u.save()
            //     .then(() => res.json('Password changed syccessfully!'))
            //     .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
}