
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface VendorStatusNotification {
  vendor_email: string;
  business_name: string;
  status: string;
  feedback?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { vendor_email, business_name, status, feedback }: VendorStatusNotification = await req.json();

    let subject = "";
    let htmlContent = "";

    if (status === "approved") {
      subject = `🎉 Your vendor application has been approved!`;
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #7D8E74;">Congratulations! You're now a verified vendor</h1>
          
          <p>Hi ${business_name},</p>
          
          <p>Great news! Your vendor application has been approved and you are now a <strong>Verified Vendor</strong> on Enosi.</p>
          
          <div style="background-color: #f0f8f0; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #7D8E74;">
            <h3 style="color: #695F4C; margin-top: 0;">What's next?</h3>
            <ul>
              <li>Your profile is now live and visible to couples</li>
              <li>You'll receive a "Verified Vendor" badge on your listings</li>
              <li>Start receiving inquiries from couples planning their weddings</li>
            </ul>
          </div>
          
          <div style="margin: 30px 0;">
            <a href="${Deno.env.get('SITE_URL')}/vendor/dashboard" 
               style="background-color: #7D8E74; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Go to Dashboard
            </a>
          </div>
          
          <p>Welcome to the Enosi family!</p>
          <p>The Enosi Team</p>
        </div>
      `;
    } else if (status === "rejected") {
      subject = `Your vendor application needs attention`;
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #8A7F66;">Application Review Required</h1>
          
          <p>Hi ${business_name},</p>
          
          <p>Thank you for your interest in becoming a vendor on Enosi. We've reviewed your application and need some additional information or changes before we can approve it.</p>
          
          ${feedback ? `
            <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
              <h3 style="color: #856404; margin-top: 0;">Feedback from our team:</h3>
              <p style="color: #856404;">${feedback}</p>
            </div>
          ` : ''}
          
          <div style="margin: 30px 0;">
            <a href="${Deno.env.get('SITE_URL')}/vendor/business-profile" 
               style="background-color: #8A7F66; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Update Your Profile
            </a>
          </div>
          
          <p>Once you've made the necessary updates, we'll review your application again.</p>
          <p>The Enosi Team</p>
        </div>
      `;
    }

    const emailResponse = await resend.emails.send({
      from: "Enosi <notifications@resend.dev>",
      to: [vendor_email],
      subject,
      html: htmlContent,
    });

    console.log("Vendor status notification sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending vendor status notification:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
