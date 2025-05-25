
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface VendorNotificationData {
  vendor_id: string;
  business_name: string;
  business_email: string;
  business_category: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { vendor_id, business_name, business_email, business_category }: VendorNotificationData = await req.json();

    const adminEmail = Deno.env.get("ADMIN_EMAIL") || "admin@enosi.com";

    const emailResponse = await resend.emails.send({
      from: "Enosi <notifications@resend.dev>",
      to: [adminEmail],
      subject: `New Vendor Application: ${business_name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #8A7F66;">New Vendor Application Submitted</h1>
          
          <div style="background-color: #f8f7f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #695F4C; margin-top: 0;">Business Details</h2>
            <p><strong>Business Name:</strong> ${business_name}</p>
            <p><strong>Category:</strong> ${business_category}</p>
            <p><strong>Email:</strong> ${business_email}</p>
            <p><strong>Vendor ID:</strong> ${vendor_id}</p>
          </div>
          
          <div style="margin: 30px 0;">
            <a href="${Deno.env.get('SITE_URL')}/admin/vendor-review/${vendor_id}" 
               style="background-color: #7D8E74; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Review Application
            </a>
          </div>
          
          <p style="color: #666; font-size: 14px;">
            Please review this vendor application and approve or reject it through the admin dashboard.
          </p>
        </div>
      `,
    });

    console.log("Admin notification sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending admin notification:", error);
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
