import nodemailer from 'nodemailer';

// Very small OTP HTML + text templates (easy to read)
const otpHtml = (otp, name = 'User') => `
  <div style="font-family: Arial, sans-serif; padding:20px;">
    <h3>CA‑Ecommerce — Hello ${name}</h3>
    <p>Your verification code:</p>
    <h2 style="letter-spacing:4px; color:#1a73e8;">${otp}</h2>
    <p>Valid for 10 minutes.</p>
    <p style="color:#777">CA‑Ecommerce</p>
  </div>
`;

const otpText = (otp, name = 'User') => `
Hello ${name},

Your CA-Ecommerce verification code: ${otp}
This code is valid for 10 minutes.

If you didn't request this, ignore this message.
`;

let transporter = null;

const initTransporter = async () => {
  if (transporter) return transporter;

  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    throw new Error('Missing EMAIL_USER or EMAIL_PASS environment variables');
  }

  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: Number(process.env.EMAIL_PORT || 465),
    secure: process.env.EMAIL_PORT ? Number(process.env.EMAIL_PORT) === 465 : true,
    auth: { user, pass },
  });

  // verify will throw if credentials are wrong
  await transporter.verify();
  return transporter;
};

/**
 * sendOTPEmail(email, otp, name, subject)
 */
const sendOTPEmail = async (email, otp, name = 'User', subject = 'Your CA-Ecommerce Verification Code') => {
  const tx = await initTransporter();
  const from = process.env.EMAIL_FROM || process.env.EMAIL_USER;
  const info = await tx.sendMail({
    from,
    to: email,
    subject,
    html: otpHtml(otp, name),
    text: otpText(otp, name),
  });
  return info;
};

export default sendOTPEmail;