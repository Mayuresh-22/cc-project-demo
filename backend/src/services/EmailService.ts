import { Resend } from "resend";

export default class EmailService {
  private resend: Resend;

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY || "");
  }

  async sendEmail(to: string, subject: string, htmlContent: string): Promise<void> {
    try {
      const { data, error } = await this.resend.emails.send({
        from: "GreenGuardian <greenguardian@mail.mayuresh.me>",
        to: [to],
        subject: subject,
        html: htmlContent,
      });
      if (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send email");
      }
      console.log("Email sent successfully:", data);
    } catch (error) {
      console.error("Error sending email:", error);
      throw new Error("Failed to send email");
    }
  }
}
