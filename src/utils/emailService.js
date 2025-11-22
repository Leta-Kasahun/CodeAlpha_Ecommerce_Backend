import nodemailer from 'nodemailer';

// OTP HTML template
export const otpTemplate = (otp, name = 'User') => {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.5;">
      <h2 style="color:#1a73e8; margin-bottom: 12px;">
        Welcome to CA-Ecommerce, ${name} 👋
      </h2>

      <p style="margin: 6px 0;">Your verification code:</p>

      <h1 style="color:#1a73e8; font-size: 34px; letter-spacing: 4px; margin: 15px 0;">
        ${otp}
      </h1>

      <p style="margin: 6px 0;">Valid for 10 minutes.</p>

      <p style="color:#777; margin-top: 25px;">CA-Ecommerce</p>
    </div>
  `;
};

// Transporter cache
let transporter = null;

/**
 * Initialize and verify the transporter once. Throws if env or auth invalid.
 */
const initTransporter = async () => {
  if (transporter) return transporter;

  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    throw new Error('Missing EMAIL_USER or EMAIL_PASS in environment');
  }

  transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user,
      pass,
    },
  });

  // Verify the connection configuration. This will throw if credentials are invalid.
  await transporter.verify();
  return transporter;
};

/**
 * Send OTP email.
 * - email: recipient email
 * - otp: the code (string)
 * - name: recipient name (optional)
 */
const sendOTPEmail = async (email, otp, name = 'User') => {
  const tx = await initTransporter();

  const mailOptions = {
    from: `CA-Ecommerce <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your CA-Ecommerce Verification Code',
    html: otpTemplate(otp, name),
  };

  const info = await tx.sendMail(mailOptions);
  return info; // caller can use info.messageId etc.
};

export default sendOTPEmail;