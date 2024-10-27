const nodemailer = require("nodemailer");


const sendEmailNotification = async (recipientEmail, subject, text) => {
    
    const transporter = nodemailer.createTransport({
        host: process.env.HOST, 
        port: 587,
        secure: false, 
        auth: {
            user: process.env.USERNAME, 
            pass: process.env.PASSWORD, 
        },
    });

    
    const mailOptions = {
        from: '"Task Management System', 
        to: recipientEmail || "admin@admin.com", 
        subject: subject, 
        text: text, 
    };

    
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
    } catch (error) {
        console.error("Error sending email: ", error);
    }
};

module.exports = sendEmailNotification;
