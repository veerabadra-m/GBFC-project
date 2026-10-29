
import nodemailer from "nodemailer";

export async function sendOwnerEmail({ name, contact }) {
  const { SMTP_EMAIL, SMTP_APP_PASSWORD, OWNER_EMAIL } = process.env;

  if (!SMTP_EMAIL || !SMTP_APP_PASSWORD || !OWNER_EMAIL) {
    throw new Error(
      "Missing SMTP_EMAIL, SMTP_APP_PASSWORD, or OWNER_EMAIL in server/.env"
    );
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_APP_PASSWORD,
    },
  });

  return transporter.sendMail({
    from: SMTP_EMAIL,
    to: OWNER_EMAIL,
    subject: "New GBFC Website Enquiry",
    text: `A new enquiry was submitted on the GBFC website.

Customer name: ${name}
Customer contact: ${contact}

Please contact the customer to follow up.`,
  });
}
