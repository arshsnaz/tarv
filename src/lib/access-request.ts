import { createServerFn } from "@tanstack/react-start";
import { Resend } from "resend";

export type AccessRequestPayload = {
  name: string;
  email: string;
  company: string;
  country: string;
  companySize: string;
  system: string;
  message: string;
};

export const submitAccessRequest = createServerFn({ method: "POST" })
  .validator((data: AccessRequestPayload) => {
    if (!data.name?.trim()) throw new Error("Name is required");
    if (!data.email?.trim() || !/^\S+@\S+\.\S+$/.test(data.email)) {
      throw new Error("A valid email is required");
    }
    if (!data.company?.trim()) throw new Error("Company is required");
    if (!data.country) throw new Error("Country is required");
    if (!data.companySize) throw new Error("Company size is required");
    if (!data.system) throw new Error("System is required");
    return data;
  })
  .handler(async ({ data }) => {
    const apiKey = process.env["RESEND_API_KEY"];
    const toEmail = process.env["ACCESS_REQUEST_TO_EMAIL"] ?? "tarv.official@gmail.com";
    const fromEmail = process.env["RESEND_FROM_EMAIL"] ?? "TARV Access Requests <onboarding@resend.dev>";

    console.log(`[AccessRequest] Target Email: "${toEmail}", API Key Prefix: "${apiKey?.substring(0, 7)}..."`);

    if (!apiKey) {
      throw new Error("Email service is not configured");
    }

    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: data.email,
      subject: `⚡ Private Access Request: ${data.name} (${data.company})`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New TARV Access Request</title>
        </head>
        <body style="margin:0; padding:0; background-color:#f1f5f9; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing:antialiased; color:#0f172a;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#f1f5f9; padding:44px 16px;">
            <tr>
              <td align="center">
                <!-- Main Email Card Container -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:580px; background-color:#ffffff; border:1px solid #e2e8f0; border-radius:18px; overflow:hidden; box-shadow:0 10px 25px -5px rgba(15, 23, 42, 0.06), 0 8px 10px -6px rgba(15, 23, 42, 0.04);">
                  
                  <!-- Top Electric Blue Gradient Accent -->
                  <tr>
                    <td style="height:5px; background:linear-gradient(90deg, #0284c7 0%, #3b82f6 50%, #6366f1 100%);"></td>
                  </tr>

                  <!-- Executive Header -->
                  <tr>
                    <td style="padding:28px 36px 22px 36px; border-bottom:1px solid #f1f5f9;">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td valign="middle">
                            <table border="0" cellspacing="0" cellpadding="0">
                              <tr>
                                <td valign="middle" style="padding-right:14px;">
                                  <img src="https://tarvofficial.vercel.app/favicon.png" width="38" height="38" alt="TARV Logo" style="display:block; border-radius:10px; background-color:#0f172a; padding:4px;" />
                                </td>
                                <td valign="middle">
                                  <span style="font-size:22px; font-weight:800; color:#0f172a; letter-spacing:-0.5px; display:block;">TARV</span>
                                  <span style="font-size:11px; color:#64748b; font-weight:600; text-transform:uppercase; letter-spacing:1.2px; display:block; margin-top:1px;">Engineering AI</span>
                                </td>
                              </tr>
                            </table>
                          </td>
                          <td align="right" valign="middle">
                            <span style="display:inline-block; padding:5px 12px; background-color:#eff6ff; border:1px solid #bfdbfe; border-radius:9999px; color:#1d4ed8; font-size:11px; font-weight:700; letter-spacing:0.6px; text-transform:uppercase;">
                              ENTERPRISE BETA
                            </span>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Email Subject Header -->
                  <tr>
                    <td style="padding:28px 36px 12px 36px;">
                      <h1 style="margin:0; font-size:22px; font-weight:700; color:#0f172a; letter-spacing:-0.5px; line-height:1.3;">
                        New Private Access Request
                      </h1>
                      <p style="margin:8px 0 0 0; font-size:14px; color:#475569; line-height:1.5;">
                        An enterprise organization has requested early access credentials for the TARV platform.
                      </p>
                    </td>
                  </tr>

                  <!-- Structured Details Grid Container -->
                  <tr>
                    <td style="padding:16px 36px 28px 36px;">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#f8fafc; border:1px solid #e2e8f0; border-radius:14px; padding:22px; table-layout:fixed;">
                        
                        <tr>
                          <td style="padding-bottom:16px;" width="50%">
                            <span style="font-size:11px; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.8px; display:block;">Full Name</span>
                            <span style="font-size:15px; font-weight:600; color:#0f172a; display:block; margin-top:3px;">${escapeHtml(data.name)}</span>
                          </td>
                          <td style="padding-bottom:16px;" width="50%">
                            <span style="font-size:11px; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.8px; display:block;">Work Email</span>
                            <a href="mailto:${escapeHtml(data.email)}" style="font-size:14px; font-weight:600; color:#2563eb; text-decoration:none; display:block; margin-top:3px; word-break:break-all;">${escapeHtml(data.email)}</a>
                          </td>
                        </tr>

                        <tr>
                          <td style="padding-bottom:16px;">
                            <span style="font-size:11px; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.8px; display:block;">Company / Firm</span>
                            <span style="font-size:15px; font-weight:600; color:#0f172a; display:block; margin-top:3px;">${escapeHtml(data.company)}</span>
                          </td>
                          <td style="padding-bottom:16px;">
                            <span style="font-size:11px; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.8px; display:block;">Company Size</span>
                            <span style="font-size:14px; font-weight:600; color:#0f172a; display:block; margin-top:3px;">${escapeHtml(data.companySize)}</span>
                          </td>
                        </tr>

                        <tr>
                          <td style="padding-bottom:4px;">
                            <span style="font-size:11px; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.8px; display:block;">Country</span>
                            <span style="font-size:14px; font-weight:600; color:#0f172a; display:block; margin-top:3px;">${escapeHtml(data.country)}</span>
                          </td>
                          <td style="padding-bottom:4px;">
                            <span style="font-size:11px; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.8px; display:block;">Primary System Focus</span>
                            <span style="font-size:14px; font-weight:600; color:#0284c7; display:block; margin-top:3px;">${escapeHtml(data.system)}</span>
                          </td>
                        </tr>

                      </table>
                    </td>
                  </tr>

                  <!-- Workflow Bottlenecks Section -->
                  ${
                    data.message
                      ? `
                  <tr>
                    <td style="padding:0 36px 28px 36px;">
                      <span style="font-size:12px; font-weight:700; color:#475569; text-transform:uppercase; letter-spacing:0.8px; display:block; margin-bottom:8px;">Workflow Bottlenecks & Notes</span>
                      <div style="background-color:#f0f9ff; border:1px solid #e0f2fe; border-left:4px solid #0284c7; border-radius:6px 12px 12px 6px; padding:18px; font-size:14px; color:#1e293b; line-height:1.6; font-style:italic;">
                        "${escapeHtml(data.message).replace(/\n/g, "<br/>")}"
                      </div>
                    </td>
                  </tr>
                  `
                      : ""
                  }

                  <!-- Primary Executive Action Button -->
                  <tr>
                    <td style="padding:4px 36px 36px 36px;" align="center">
                      <a href="mailto:${escapeHtml(data.email)}?subject=${encodeURIComponent(`Re: TARV Enterprise Beta Access — ${data.company}`)}" style="display:inline-block; background-color:#0f172a; color:#ffffff; font-size:14px; font-weight:700; padding:14px 32px; border-radius:9999px; text-decoration:none; box-shadow:0 4px 12px rgba(15, 23, 42, 0.15); letter-spacing:0.2px;">
                        Reply Directly to ${escapeHtml(data.name)} &rarr;
                      </a>
                    </td>
                  </tr>

                  <!-- Executive Footer -->
                  <tr>
                    <td style="padding:22px 36px; background-color:#f8fafc; border-top:1px solid #e2e8f0; text-align:center;">
                      <p style="margin:0; font-size:12px; color:#64748b; line-height:1.6;">
                        <strong>TARV AI Inc.</strong> &bull; API World Tower 403, Sheikh Zayed Rd, Dubai, UAE<br/>
                        <a href="https://tarvofficial.vercel.app" style="color:#0284c7; text-decoration:none; font-weight:600;">tarv.ai</a> &bull; Physics-Grade MEP Automation Suite
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
      throw new Error("Failed to send access request. Please try again.");
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