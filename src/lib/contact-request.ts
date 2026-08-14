import { createServerFn } from "@tanstack/react-start";
import { Resend } from "resend";

export type ContactRequestPayload = {
  name: string;
  email: string;
  company: string;
  message: string;
};

export const submitContactRequest = createServerFn({ method: "POST" })
  .validator((data: ContactRequestPayload) => {
    if (!data.name?.trim()) throw new Error("Name is required");
    if (!data.email?.trim() || !/^\S+@\S+\.\S+$/.test(data.email)) {
      throw new Error("A valid email is required");
    }
    if (!data.message?.trim()) throw new Error("Message is required");
    return data;
  })
  .handler(async ({ data }) => {
    const apiKey = process.env["RESEND_API_KEY"];
    const toEmail = process.env["CONTACT_TO_EMAIL"] ?? "tarv.official@gmail.com";

    if (!apiKey) {
      // Return unconfigured flag to fallback gracefully
      return { success: false, fallbackMailto: true };
    }

    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: "TARV Contact Us <contact@resend.dev>",
      to: toEmail,
      replyTo: data.email,
      subject: `📩 Contact Inquiry from ${data.name} (${data.company || "Individual"})`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New TARV Contact Inquiry</title>
        </head>
        <body style="margin:0; padding:0; background-color:#09090b; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color:#f4f4f5;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#09090b; padding:40px 15px;">
            <tr>
              <td align="center">
                <!-- Email Container -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:600px; background-color:#121215; border:1px solid #27272a; border-radius:16px; overflow:hidden; box-shadow:0 20px 25px -5px rgba(0, 0, 0, 0.5);">
                  
                  <!-- Top Gradient Accent Bar -->
                  <tr>
                    <td style="height:4px; background:linear-gradient(90deg, #00f2fe 0%, #4facfe 100%);"></td>
                  </tr>

                  <!-- Header with Logo -->
                  <tr>
                    <td style="padding:28px 32px 20px 32px; border-bottom:1px solid #27272a;">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td valign="middle">
                            <table border="0" cellspacing="0" cellpadding="0">
                              <tr>
                                <td valign="middle" style="padding-right:12px;">
                                  <img src="https://tarvofficial.vercel.app/favicon.png" width="36" height="36" alt="TARV Logo" style="display:block; border-radius:8px; border:1px solid rgba(255,255,255,0.1);" />
                                </td>
                                <td valign="middle">
                                  <span style="font-size:20px; font-weight:800; tracking:1px; color:#ffffff; letter-spacing:0.5px;">TARV</span>
                                  <span style="display:block; font-size:11px; color:#a1a1aa; font-weight:500; text-transform:uppercase; letter-spacing:1px; margin-top:2px;">Engineering AI</span>
                                </td>
                              </tr>
                            </table>
                          </td>
                          <td align="right" valign="middle">
                            <span style="display:inline-block; padding:4px 10px; background-color:rgba(0, 242, 254, 0.1); border:1px solid rgba(0, 242, 254, 0.3); border-radius:9999px; color:#38bdf8; font-size:11px; font-weight:600; letter-spacing:0.5px;">
                              CONTACT INQUIRY
                            </span>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Title Banner -->
                  <tr>
                    <td style="padding:28px 32px 12px 32px;">
                      <h1 style="margin:0; font-size:22px; font-weight:700; color:#ffffff; letter-spacing:-0.5px;">
                        New Website Contact Inquiry
                      </h1>
                      <p style="margin:8px 0 0 0; font-size:14px; color:#a1a1aa; line-height:1.5;">
                        A visitor has submitted a message via the Contact Us form on tarv.ai.
                      </p>
                    </td>
                  </tr>

                  <!-- Sender Details Card -->
                  <tr>
                    <td style="padding:16px 32px 24px 32px;">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#18181b; border:1px solid #27272a; border-radius:12px; padding:20px; table-layout:fixed;">
                        
                        <tr>
                          <td style="padding-bottom:14px;" width="50%">
                            <span style="font-size:11px; font-weight:600; color:#71717a; text-transform:uppercase; letter-spacing:0.8px; display:block;">Full Name</span>
                            <span style="font-size:15px; font-weight:600; color:#f4f4f5; display:block; margin-top:3px;">${escapeHtml(data.name)}</span>
                          </td>
                          <td style="padding-bottom:14px;" width="50%">
                            <span style="font-size:11px; font-weight:600; color:#71717a; text-transform:uppercase; letter-spacing:0.8px; display:block;">Work Email</span>
                            <a href="mailto:${escapeHtml(data.email)}" style="font-size:14px; font-weight:500; color:#38bdf8; text-decoration:none; display:block; margin-top:3px; word-break:break-all;">${escapeHtml(data.email)}</a>
                          </td>
                        </tr>

                        <tr>
                          <td colspan="2">
                            <span style="font-size:11px; font-weight:600; color:#71717a; text-transform:uppercase; letter-spacing:0.8px; display:block;">Company / Firm</span>
                            <span style="font-size:15px; font-weight:600; color:#ffffff; display:block; margin-top:3px;">${escapeHtml(data.company || "N/A")}</span>
                          </td>
                        </tr>

                      </table>
                    </td>
                  </tr>

                  <!-- Message Content -->
                  <tr>
                    <td style="padding:0 32px 28px 32px;">
                      <span style="font-size:12px; font-weight:600; color:#a1a1aa; text-transform:uppercase; letter-spacing:0.8px; display:block; margin-bottom:8px;">Message Content</span>
                      <div style="background-color:#18181b; border-left:3px solid #00f2fe; border-radius:4px 8px 8px 4px; padding:16px; font-size:14px; color:#e4e4e7; line-height:1.6;">
                        ${escapeHtml(data.message).replace(/\n/g, "<br/>")}
                      </div>
                    </td>
                  </tr>

                  <!-- Action CTA Button -->
                  <tr>
                    <td style="padding:0 32px 32px 32px;" align="center">
                      <a href="mailto:${escapeHtml(data.email)}?subject=${encodeURIComponent(`Re: TARV Contact Inquiry — ${data.name}`)}" style="display:inline-block; background:linear-gradient(90deg, #00f2fe 0%, #4facfe 100%); color:#09090b; font-size:14px; font-weight:700; padding:12px 28px; border-radius:9999px; text-decoration:none; box-shadow:0 4px 14px rgba(0, 242, 254, 0.3);">
                        Reply Directly to ${escapeHtml(data.name)} &rarr;
                      </a>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="padding:20px 32px; background-color:#09090b; border-top:1px solid #27272a; text-align:center;">
                      <p style="margin:0; font-size:12px; color:#71717a; line-height:1.5;">
                        TARV AI Inc. &bull; API World Tower 403, Sheikh Zayed Rd, Dubai, UAE<br/>
                        <a href="https://tarvofficial.vercel.app" style="color:#a1a1aa; text-decoration:underline;">tarv.ai</a> &bull; Physics-Grade MEP Automation Suite
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      throw new Error("Failed to send message via Resend.");
    }

    return { success: true };
  });

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
