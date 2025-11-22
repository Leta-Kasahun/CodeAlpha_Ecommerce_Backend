// Safe OTP email templates (HTML + plain text)
// Usage: import { otpHtml, otpText } from './emailTemplates.js'
// sendMail({ from, to, subject, html: otpHtml(otp, name), text: otpText(otp, name) })

const escapeHtml = (str = '') =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export const otpHtml = (otp, name = 'User') => {
  const safeName = escapeHtml(name);
  const preheader = `Your CA‑Ecommerce verification code is ${otp}. It expires in 10 minutes.`;

  return `
  <!-- Preview text: ${preheader} -->
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; color: #222; padding: 20px; max-width: 600px; margin: 0 auto;">
    <div style="display:none; max-height:0; overflow:hidden; font-size:1px; line-height:1px; color:#fff; opacity:0;">
      ${preheader}
    </div>

    <div style="background:#ffffff; border-radius:8px; padding:24px; box-shadow:0 2px 6px rgba(0,0,0,0.06);">
      <h2 style="color:#1a73e8; margin:0 0 12px; font-size:20px;">Welcome to CA‑Ecommerce, ${safeName} 👋</h2>

      <p style="margin:0 0 8px; color:#555; font-size:15px;">Your verification code</p>

      <div style="margin:14px 0 16px; text-align:center;">
        <span style="display:inline-block; padding:12px 20px; font-size:28px; letter-spacing:4px; color:#1a73e8; background:#f1f8ff; border-radius:6px;">
          ${escapeHtml(otp)}
        </span>
      </div>

      <p style="margin:0; color:#666; font-size:13px;">This code is valid for 10 minutes.</p>

      <hr style="border:none; border-top:1px solid #eee; margin:20px 0;" />

      <p style="margin:0; color:#888; font-size:13px;">If you did not request this, you can safely ignore this email.</p>

      <p style="margin-top:18px; color:#777; font-size:13px;">CA‑Ecommerce</p>
    </div>
  </div>
  `;
};

export const otpText = (otp, name = 'User') => {
  const safeName = String(name).replace(/\s+/g, ' ').trim();
  return `Welcome to CA-Ecommerce, ${safeName}

Your verification code: ${otp}

This code is valid for 10 minutes.

If you did not request this, ignore this email.

— CA-Ecommerce`;
};