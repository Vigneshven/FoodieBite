import nodemailer from "nodemailer";

const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS } = process.env;

if (!SMTP_HOST || !SMTP_PORT || !SMTP_SECURE || !SMTP_USER || !SMTP_PASS) {
  throw new Error("Email config is missing");
}

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT),
  secure: SMTP_SECURE === "true",
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  return transporter.sendMail({
    from: `"FoodieBite" <${SMTP_USER}>`,
    to,
    subject,
    html,
  });
}

export async function verifyEmailConnection() {
  return transporter.verify();
}
