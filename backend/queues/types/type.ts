export type EmailJobData = {
  to: string;
  subject: string;
  html: string;
};

// notification

export type NotificationJobData = {
  recipientId: number;
  title: string;
  message: string;
  type: string;
};
