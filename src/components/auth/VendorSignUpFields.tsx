
import { Input } from "@/components/ui/input";

interface VendorSignUpFieldsProps {
  businessName: string;
  setBusinessName: (value: string) => void;
  businessCategory: string;
  setBusinessCategory: (value: string) => void;
}

const VendorSignUpFields = ({
  businessName,
  setBusinessName,
  businessCategory,
  setBusinessCategory
}: VendorSignUpFieldsProps) => {
  const categories = [
    { value: "photography", label: "Photography" },
    { value: "videography", label: "Videography" },
    { value: "catering", label: "Catering" },
    { value: "venue", label: "Venue" },
    { value: "music", label: "Music & Entertainment" },
    { value: "flowers", label: "Flowers & Décor" },
    { value: "officiant", label: "Celebrant/Officiant" },
    { value: "planner", label: "Wedding Planner" },
    { value: "dress", label: "Bridal Wear" },
    { value: "suit", label: "Suits & Attire" },
    { value: "bakery", label: "Cake & Bakery" },
    { value: "transport", label: "Transportation" },
    { value: "jewelry", label: "Jewelry" },
    { value: "beauty", label: "Hair & Beauty" },
    { value: "other", label: "Other Services" }
  ];

  return (
    <>
      <div className="space-y-2">
        <label htmlFor="businessName" className="block text-sm font-medium text-wednest-brown">
          Business Name
        </label>
        <Input 
          id="businessName"
          type="text" 
          placeholder="Your Business Name"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          className="w-full"
          required
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="businessCategory" className="block text-sm font-medium text-wednest-brown">
          Business Category
        </label>
        <select
          id="businessCategory"
          value={businessCategory}
          onChange={(e) => setBusinessCategory(e.target.value)}
          className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wednest-sage focus:border-transparent"
          required
        >
          {categories.map(category => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default VendorSignUpFields;
