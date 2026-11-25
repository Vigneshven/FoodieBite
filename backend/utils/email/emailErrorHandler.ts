import { UnrecoverableError } from "bullmq";
import { EmailError } from "../types/type";

export function handleEmailError(error: Error): void {
  const emailError = error as EmailError;

  const permanentSmtpCodes = [550, 553];
  //   550 Mailbox unavailable / not found: Recipient address does not exist.
  //   553 Mailbox name not allowed: Invalid syntax or blocked domain.

  const isPermanent =
    emailError.code === "EAUTH" ||
    (emailError.responseCode !== undefined &&
      permanentSmtpCodes.includes(emailError.responseCode));

  if (isPermanent) {
    throw new UnrecoverableError(
      `Permanent email failure: ${emailError.responseCode || emailError.code || emailError.message}`,
    );
  }
  throw error;
}
