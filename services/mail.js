import nodemailer from 'nodemailer';

const sendEmail = async (userName, userEmail, otp) => {
    const transporter = nodemailer.createTransport({
        host: '127.0.0.1',
        port: 8080,
        secure: true,
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_AUTH_USER,
            pass: process.env.GMAIL_AUTH_PASS
        }
    });

    const info = await transporter.sendMail({
        from: `Airbnb <${process.env.GMAIL_AUTH_USER}>`,
        to: userEmail,
        subject: `${otp} is your Airbnb Verification Code`,
        html: `
        <p> Greetings, ${userName} </p>
        <h2> Confirm your email address </h2>
        <p>
        Thanks for starting the new Airbnb account creation process. We want to make sure it's really you. Please enter the following verification code when prompted. If you don't want to create an account, you can ignore this message.
        </p>

        <span> Your Airbnb verification code is -: </span>
        <h1> ${otp} </h1>
        <p> Verification code expires in 15 minutes. </p>
        <p> Thanks, </p>
        <p> Airbnb </p>
        `
    }).catch((err) => {
        if (err) console.error(`${err.name}: ${err.message}`);
    });
};

export default sendEmail;