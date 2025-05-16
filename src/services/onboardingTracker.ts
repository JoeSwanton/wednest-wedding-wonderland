
import { supabase } from "@/integrations/supabase/client";
import { VendorOnboardingData } from "@/types/vendor";

/**
 * Log onboarding step completion to Supabase
 * This data is only visible to admins
 */
export async function logOnboardingStep(
  stepName: string, 
  stepData: any, 
  status: 'started' | 'completed' | 'error' | 'skipped'
): Promise<boolean> {
  try {
    const { error, data: user } = await supabase.auth.getUser();
    
    if (error || !user) {
      console.error("Error getting user:", error);
      return false;
    }
    
    // Clean sensitive data if needed
    const sanitizedData = sanitizeStepData(stepName, stepData);
    
    const { error: logError } = await supabase
      .from('onboarding_logs')
      .insert({
        user_id: user.user.id,
        step_name: stepName,
        step_data: sanitizedData,
        status: status,
      });
    
    if (logError) {
      console.error("Error logging onboarding step:", logError);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Exception in logOnboardingStep:", error);
    return false;
  }
}

/**
 * Sanitize step data to remove sensitive information
 * This is important for security and privacy
 */
function sanitizeStepData(stepName: string, stepData: any): any {
  // Create a deep clone to avoid modifying the original data
  const sanitized = JSON.parse(JSON.stringify(stepData));
  
  // Remove potentially sensitive fields based on the step
  if (stepName === 'ContactLocation') {
    // Remove exact address details but keep city/state for analysis
    if (sanitized.address) sanitized.address = '[REDACTED]';
  }
  
  return sanitized;
}

/**
 * Track a complete onboarding journey
 */
export async function logCompleteOnboardingData(formData: VendorOnboardingData): Promise<boolean> {
  try {
    const { error, data: user } = await supabase.auth.getUser();
    
    if (error || !user) {
      console.error("Error getting user:", error);
      return false;
    }
    
    // Create a sanitized version of the complete form data
    const sanitizedData = {
      ...formData,
      // Redact potentially sensitive information
      abn: formData.abn ? '[REDACTED]' : null,
      phone: formData.phone ? '[REDACTED]' : null,
      // Keep portfolio image count but not actual image data
      portfolioImagesCount: formData.portfolioImages?.length || 0,
      portfolioImages: formData.portfolioImages?.map(img => ({ 
        url: img.url,
        path: img.path,
        caption: img.caption
      })),
      // Keep package count but simplify package data
      servicePackagesCount: formData.servicePackages?.length || 0,
      servicePackages: formData.servicePackages?.map(pkg => ({
        name: pkg.name,
        priceRange: pkg.priceRange
      }))
    };
    
    const { error: logError } = await supabase
      .from('onboarding_logs')
      .insert({
        user_id: user.user.id,
        step_name: 'CompleteOnboarding',
        step_data: sanitizedData,
        status: 'completed',
      });
    
    if (logError) {
      console.error("Error logging complete onboarding data:", logError);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Exception in logCompleteOnboardingData:", error);
    return false;
  }
}
