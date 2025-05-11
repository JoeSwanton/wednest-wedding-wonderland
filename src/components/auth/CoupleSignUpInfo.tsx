
import { UserCheck } from "lucide-react";

const CoupleSignUpInfo = () => {
  return (
    <div className="bg-wednest-beige/20 p-4 rounded-md mb-2">
      <h3 className="text-lg font-medium flex items-center gap-2 text-wednest-brown">
        <UserCheck size={18} />
        <span>Couple Account Benefits</span>
      </h3>
      <ul className="list-disc pl-5 mt-2 text-sm text-wednest-brown-light">
        <li>Create and manage your wedding planning checklist</li>
        <li>Build and share your wedding website</li>
        <li>Track your budget and guest list</li>
        <li>Find and message vendors directly</li>
      </ul>
    </div>
  );
};

export default CoupleSignUpInfo;
