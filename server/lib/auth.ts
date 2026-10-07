import "dotenv/config";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma.js";
import { sendEmail } from "./email.js";

// Parse and validate trusted origins
const trustedOrigins = process.env.TRUSTED_ORIGINS
  ? process.env.TRUSTED_ORIGINS.split(",")
      .map((origin) => origin.trim())
      .filter(Boolean)
  : [
      "https://aisitebuilder.site",
      "https://www.aisitebuilder.site",
      "https://ai-site-builder-r1a4.onrender.com",
    ];;

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,

    // ✅ Called when user requests "forgot password"
    sendResetPassword: async ({ user, token }) => {
      const resetUrl = `https://aisitebuilder.site/auth/reset-password?token=${token}`;


      await sendEmail({
        to: user.email,
        subject: "Reset your password",
        html: `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td align="center" style="padding:40px 16px;">
                <table width="100%" cellpadding="0" cellspacing="0" style="
                  max-width:520px;
                  background:#ffffff;
                  border-radius:16px;
                  padding:32px;
                  box-shadow:0 12px 30px rgba(0,0,0,0.08);
                ">
                  <tr>
                    <td align="center" style="font-size:22px;font-weight:700;color:#111827;">
                      🔐 Ai-Site Builder
                    </td>
                  </tr>

                  <tr><td style="height:24px;"></td></tr>

                  <tr>
                    <td style="font-size:20px;font-weight:600;color:#111827;">
                      Reset your password
                    </td>
                  </tr>

                  <tr><td style="height:12px;"></td></tr>

                  <tr>
                    <td style="font-size:15px;line-height:1.6;color:#4b5563;">
                      We received a request to reset your password.
                      Click the button below to choose a new one.
                    </td>
                  </tr>

                  <tr><td style="height:28px;"></td></tr>

                  <!-- Button -->
                  <tr>
                    <td align="center">
                      <a href="${resetUrl}" style="
                        display:inline-block;
                        padding:14px 32px;
                        background:#6366f1;
                        color:#ffffff;
                        font-size:15px;
                        font-weight:600;
                        text-decoration:none;
                        border-radius:10px;
                      ">
                        Reset Password
                      </a>
                    </td>
                  </tr>

                  <tr><td style="height:20px;"></td></tr>

                  <!-- Fallback link -->
                  <tr>
                    <td style="font-size:13px;color:#6b7280;line-height:1.6;">
                      If the button doesn’t work, copy and paste this link into your browser:
                      <br /><br />
                      <a href="${resetUrl}" style="color:#6366f1;word-break:break-all;">
                        ${resetUrl}
                      </a>
                    </td>
                  </tr>

                  <tr><td style="height:24px;"></td></tr>

                  <tr>
                    <td style="font-size:13px;color:#6b7280;line-height:1.6;">
                      If you didn’t request this, you can safely ignore this email.
                      This link will expire shortly for security reasons.
                    </td>
                  </tr>

                  <tr><td style="height:24px;"></td></tr>

                  <tr>
                    <td align="center" style="font-size:12px;color:#9ca3af;">
                      © 2026 Ai-Site-Builder.
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>`,
      });
    },

    // ✅ Called after password is successfully reset
    onPasswordReset: async ({ user }, request) => {
      await sendEmail({
        to: user.email,
        subject: "Your password was changed",
        html: `
      <p>Hi ${user.name} 👋</p>
      <p>Your password was successfully changed.</p>
      <p>If this wasn’t you, please reset your password immediately.</p>
      <p> — Rati Ranjan</p>`,
      });
      // you can add audit log, notification, etc. here
    },
  },

  user: {
    changeEmail: { enabled: true },
    deleteUser: { enabled: true },
  },

  trustedOrigins,
  baseURL: process.env.BETTER_AUTH_URL!,
  secret: process.env.BETTER_AUTH_SECRET!,

  advanced: {
    cookies: {
      session_token: {
        name: "auth_session",
        attributes: {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
          path: "/",
        },
      },
    },
  },
});


// import "dotenv/config";
// import { betterAuth } from "better-auth";
// import { prismaAdapter } from "better-auth/adapters/prisma";
// import prisma from "./prisma.js";

// // Parse and validate trusted origins
// const trustedOrigins = process.env.TRUSTED_ORIGINS 
//   ? process.env.TRUSTED_ORIGINS.split(',').map(origin => origin.trim()).filter(Boolean)
//   : ['http://localhost:5173'];

// export const auth = betterAuth({
//     database: prismaAdapter(prisma, {
//         provider: "postgresql", 
//     }),
//     emailAndPassword: { 
//       enabled: true, 
//     }, 
//     user:{
//       changeEmail:{ enabled:true },
//       deleteUser:{ enabled:true },
//     },
//     trustedOrigins,
//     baseURL: process.env.BETTER_AUTH_URL!,
//     secret: process.env.BETTER_AUTH_SECRET!,
//     advanced: {
//       cookies: {
//         session_token: {
//           name: "auth_session",
//           attributes: {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === "production",
//             sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
//             path: "/",
//           }
//         }
//       }
//     }

// }); 



