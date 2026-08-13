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
    const toEmail = process.env["CONTACT_TO_EMAIL"] ?? "admin@tarv.ai";

    if (!apiKey) {
      // Return unconfigured flag to fallback gracefully
      return { success: false, fallbackMailto: true };
    }

    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: "TARV Contact Us <contact@resend.dev>",
      to: toEmail,
      replyTo: data.email,
      subject: `New Contact Inquiry from ${data.name} (${data.company || "Individual"})`,
      html: `
        <h2>New TARV Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Company:</strong> ${escapeHtml(data.company || "N/A")}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(data.message).replace(/\n/g, "<br/>")}</p>
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
