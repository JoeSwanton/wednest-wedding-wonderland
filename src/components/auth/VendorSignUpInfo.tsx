
import { UserCheck } from "lucide-react";

const VendorSignUpInfo = () => {
  return (
    <div className="bg-wednest-beige/20 p-4 rounded-md mb-2">
      <h3 className="text-lg font-medium flex items-center gap-2 text-wednest-brown">
        <UserCheck size={18} />
        <span>Vendor Account Benefits</span>
      </h3>
      <ul className="list-disc pl-5 mt-2 text-sm text-wednest-brown-light">
        <li>Create and manage your business listing</li>
        <li>Showcase your portfolio and reviews</li>
        <li>Receive booking inquiries</li>
        <li>Manage your availability calendar</li>
        <li>Connect with engaged couples</li>
      </ul>
    </div>
  );
};

export default VendorSignUpInfo;
