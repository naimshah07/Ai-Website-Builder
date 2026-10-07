import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY as string);

type SendEmailOptions = {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
};

export async function sendEmail({
  to,
  subject,
  html,
  text,
}: SendEmailOptions) {
 return resend.emails.send({
  from: "AI Site Builder <no-reply@aisitebuilder.site>",
  to,
  subject,
  html,
  text,
} as any);

}
