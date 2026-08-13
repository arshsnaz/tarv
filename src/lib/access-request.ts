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
    const toEmail = process.env["ACCESS_REQUEST_TO_EMAIL"] ?? "admin@tarv.ai";

    if (!apiKey) {
      throw new Error("Email service is not configured");
    }

    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: "TARV Access Requests <onboarding@resend.dev>",
      to: toEmail,
      replyTo: data.email,
      subject: `New access request — ${data.company}`,
      html: `
        <h2>New TARV access request</h2>
        <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Company:</strong> ${escapeHtml(data.company)}</p>
        <p><strong>Country:</strong> ${escapeHtml(data.country)}</p>
        <p><strong>Company size:</strong> ${escapeHtml(data.companySize)}</p>
        <p><strong>System:</strong> ${escapeHtml(data.system)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(data.message || "—").replace(/\n/g, "<br/>")}</p>
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