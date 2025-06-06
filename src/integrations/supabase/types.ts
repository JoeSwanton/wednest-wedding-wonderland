export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "admin_users_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "couple_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admin_users_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "vendor_view"
            referencedColumns: ["id"]
          },
        ]
      }
      onboarding_logs: {
        Row: {
          created_at: string
          id: string
          status: string
          step_data: Json
          step_name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          status: string
          step_data: Json
          step_name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          status?: string
          step_data?: Json
          step_name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "onboarding_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "couple_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "onboarding_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "vendor_view"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_vendors: {
        Row: {
          created_at: string | null
          id: string
          user_id: string
          vendor_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          user_id: string
          vendor_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          user_id?: string
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_vendors_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "saved_vendors_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendor_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          bio: string | null
          created_at: string
          display_name: string | null
          id: string
          updated_at: string
          user_role: Database["public"]["Enums"]["user_role"]
        }
        Insert: {
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id: string
          updated_at?: string
          user_role: Database["public"]["Enums"]["user_role"]
        }
        Update: {
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          user_role?: Database["public"]["Enums"]["user_role"]
        }
        Relationships: [
          {
            foreignKeyName: "user_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "couple_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "vendor_view"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_inquiries: {
        Row: {
          budget_range: string | null
          created_at: string | null
          customer_email: string
          customer_id: string
          customer_name: string
          guest_count: string | null
          id: string
          message: string
          status: string | null
          updated_at: string | null
          vendor_id: string
          wedding_date: string | null
        }
        Insert: {
          budget_range?: string | null
          created_at?: string | null
          customer_email: string
          customer_id: string
          customer_name: string
          guest_count?: string | null
          id?: string
          message: string
          status?: string | null
          updated_at?: string | null
          vendor_id: string
          wedding_date?: string | null
        }
        Update: {
          budget_range?: string | null
          created_at?: string | null
          customer_email?: string
          customer_id?: string
          customer_name?: string
          guest_count?: string | null
          id?: string
          message?: string
          status?: string | null
          updated_at?: string | null
          vendor_id?: string
          wedding_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vendor_inquiries_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_inquiries_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendor_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      vendor_packages: {
        Row: {
          created_at: string
          description: string | null
          features: string[] | null
          id: string
          name: string
          price_range: string
          updated_at: string
          vendor_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          features?: string[] | null
          id?: string
          name: string
          price_range: string
          updated_at?: string
          vendor_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          features?: string[] | null
          id?: string
          name?: string
          price_range?: string
          updated_at?: string
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vendor_packages_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "couple_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_packages_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendor_view"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_portfolio: {
        Row: {
          caption: string | null
          created_at: string
          display_order: number
          id: string
          image_url: string
          storage_path: string
          vendor_id: string
        }
        Insert: {
          caption?: string | null
          created_at?: string
          display_order: number
          id?: string
          image_url: string
          storage_path: string
          vendor_id: string
        }
        Update: {
          caption?: string | null
          created_at?: string
          display_order?: number
          id?: string
          image_url?: string
          storage_path?: string
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vendor_portfolio_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "couple_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_portfolio_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendor_view"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_profiles: {
        Row: {
          abn: string | null
          address: string | null
          application_status: string | null
          availability_status: string | null
          base_price_range: string | null
          bio: string
          business_category: string
          business_email: string
          business_name: string
          city: string
          created_at: string
          facebook: string | null
          feedback: string | null
          instagram: string | null
          instagram_feed: string | null
          is_published: boolean | null
          logo_url: string | null
          onboarding_completed: boolean | null
          phone: string
          postcode: string | null
          required_actions: string[] | null
          search_keywords: string | null
          service_radius: number | null
          specialties: string[] | null
          state: string
          tagline: string | null
          updated_at: string
          user_id: string
          verified_vendor: boolean | null
          website: string | null
          willing_to_travel: boolean | null
          years_in_business: number | null
        }
        Insert: {
          abn?: string | null
          address?: string | null
          application_status?: string | null
          availability_status?: string | null
          base_price_range?: string | null
          bio: string
          business_category: string
          business_email: string
          business_name: string
          city: string
          created_at?: string
          facebook?: string | null
          feedback?: string | null
          instagram?: string | null
          instagram_feed?: string | null
          is_published?: boolean | null
          logo_url?: string | null
          onboarding_completed?: boolean | null
          phone: string
          postcode?: string | null
          required_actions?: string[] | null
          search_keywords?: string | null
          service_radius?: number | null
          specialties?: string[] | null
          state: string
          tagline?: string | null
          updated_at?: string
          user_id: string
          verified_vendor?: boolean | null
          website?: string | null
          willing_to_travel?: boolean | null
          years_in_business?: number | null
        }
        Update: {
          abn?: string | null
          address?: string | null
          application_status?: string | null
          availability_status?: string | null
          base_price_range?: string | null
          bio?: string
          business_category?: string
          business_email?: string
          business_name?: string
          city?: string
          created_at?: string
          facebook?: string | null
          feedback?: string | null
          instagram?: string | null
          instagram_feed?: string | null
          is_published?: boolean | null
          logo_url?: string | null
          onboarding_completed?: boolean | null
          phone?: string
          postcode?: string | null
          required_actions?: string[] | null
          search_keywords?: string | null
          service_radius?: number | null
          specialties?: string[] | null
          state?: string
          tagline?: string | null
          updated_at?: string
          user_id?: string
          verified_vendor?: boolean | null
          website?: string | null
          willing_to_travel?: boolean | null
          years_in_business?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "vendor_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "couple_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "vendor_view"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_status_logs: {
        Row: {
          changed_by: string | null
          created_at: string | null
          feedback: string | null
          id: string
          new_status: string | null
          old_status: string | null
          vendor_id: string | null
        }
        Insert: {
          changed_by?: string | null
          created_at?: string | null
          feedback?: string | null
          id?: string
          new_status?: string | null
          old_status?: string | null
          vendor_id?: string | null
        }
        Update: {
          changed_by?: string | null
          created_at?: string | null
          feedback?: string | null
          id?: string
          new_status?: string | null
          old_status?: string | null
          vendor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vendor_status_logs_changed_by_fkey"
            columns: ["changed_by"]
            isOneToOne: false
            referencedRelation: "couple_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_status_logs_changed_by_fkey"
            columns: ["changed_by"]
            isOneToOne: false
            referencedRelation: "vendor_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_status_logs_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendor_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      wedding_details: {
        Row: {
          created_at: string
          exact_guest_count: number | null
          guest_count: string
          id: string
          location_details: string | null
          partner1_name: string
          partner2_name: string
          selected_date: string | null
          updated_at: string
          user_id: string
          wedding_date_status: string
          wedding_location_status: string
        }
        Insert: {
          created_at?: string
          exact_guest_count?: number | null
          guest_count: string
          id?: string
          location_details?: string | null
          partner1_name: string
          partner2_name: string
          selected_date?: string | null
          updated_at?: string
          user_id: string
          wedding_date_status: string
          wedding_location_status: string
        }
        Update: {
          created_at?: string
          exact_guest_count?: number | null
          guest_count?: string
          id?: string
          location_details?: string | null
          partner1_name?: string
          partner2_name?: string
          selected_date?: string | null
          updated_at?: string
          user_id?: string
          wedding_date_status?: string
          wedding_location_status?: string
        }
        Relationships: [
          {
            foreignKeyName: "wedding_details_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "couple_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wedding_details_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "vendor_view"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      couple_view: {
        Row: {
          bio: string | null
          display_name: string | null
          email: string | null
          id: string | null
          user_role: Database["public"]["Enums"]["user_role"] | null
        }
        Relationships: []
      }
      vendor_view: {
        Row: {
          bio: string | null
          display_name: string | null
          email: string | null
          id: string | null
          user_role: Database["public"]["Enums"]["user_role"] | null
        }
        Relationships: []
      }
    }
    Functions: {
      is_admin: {
        Args: { uid: string }
        Returns: boolean
      }
    }
    Enums: {
      user_role: "couple" | "vendor"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_role: ["couple", "vendor"],
    },
  },
} as const
