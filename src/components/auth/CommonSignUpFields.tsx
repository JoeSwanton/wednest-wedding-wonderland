
import { Input } from "@/components/ui/input";

interface CommonSignUpFieldsProps {
  fullName: string;
  setFullName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  confirmPassword: string;
  setConfirmPassword: (value: string) => void;
  userType: string;
}

const CommonSignUpFields = ({
  fullName,
  setFullName,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  userType,
}: CommonSignUpFieldsProps) => {
  return (
    <>
      <div className="space-y-2">
        <label htmlFor="fullName" className="block text-sm font-medium text-wednest-brown">
          {userType === "vendor" ? "Your Name" : "Full Name"}
        </label>
        <Input 
          id="fullName"
          type="text" 
          placeholder={userType === "vendor" ? "Your Name" : "Your Name"}
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full"
          required
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-wednest-brown">
          Email
        </label>
        <Input 
          id="email"
          type="email" 
          placeholder="your.email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full"
          required
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium text-wednest-brown">
          Password
        </label>
        <Input 
          id="password"
          type="password" 
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full"
          required
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-wednest-brown">
          Confirm Password
        </label>
        <Input 
          id="confirmPassword"
          type="password" 
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full"
          required
        />
      </div>
    </>
  );
};

export default CommonSignUpFields;
