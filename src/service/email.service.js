import nodemailer from "nodemailer";
import "dotenv/config";

// Create a transporter using SMTP
export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
    },
});

// Verify the connection configuration
transporter.verify((error, success) => {
    if (error) {
        console.log("Error connecting to email server:", error);
    } else {
        console.log("Email server is ready to send message ....");
    }
});

// Function to send email
export const sendEmail = async (to, subject, text, html) => {
    try {
        const info = await transporter.sendMail({
            from: `" bank-transaction-system"<${process.env.EMAIL_USER}>`, // Sender address
            to, // List of receivers
            subject, // Subject line
            text, // Plain text body
            html, // Html body
        });
    } catch (error) {
        console.log("Error sending email :", error);
    }
};

// Function to send email for registered email address
export const sendRegisteredEmail = async (email, name) => {
    const subject = "Welcome to Bank-Transaction-System";
    const text = `Hello${name}, \n\n Thank Your for Registering at Bank-Transaction-System`;
    const html = `<p> Dear ${name},</p> <p> Thank you for registering at bank-transaction-system. We're excited to have you on board !</p><p> Best regards,<br> The Bank-Transaction-System</p>
    </p>`;

    await sendEmail(email, subject, text, html);
};
