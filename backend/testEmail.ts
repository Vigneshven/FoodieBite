import "./config/env";
import { sendEmail, verifyEmailConnection } from "./utils/email";

async function testEmail() {
  try {
    await verifyEmailConnection();

    console.log("Email server connected successfully");

    await sendEmail({
      to: "vikiarts84@gmail.com",
      subject: "Foodiebite email test",
      html: `
        <h2>Welcome to FoodieBite!</h2>
        <p>Your email config is working</p>
        `,
    });
    console.log("Test mail send successfully");
  } catch (error) {
    console.log(error);
  }
}

testEmail();
