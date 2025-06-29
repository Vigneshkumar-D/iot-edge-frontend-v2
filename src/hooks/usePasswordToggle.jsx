import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const usePasswordToggle = () => {
  const [visibility, setVisibility] = useState(false);

  const toggleVisibility = () => setVisibility(prev => !prev);

  const inputIcon = visibility ? (
    <Eye
      className="ml-auto cursor-pointer opacity-50 peer-disabled:cursor-not-allowed"
      onClick={toggleVisibility}
      size={16}
    />
  ) : (
    <EyeOff
      className="ml-auto cursor-pointer opacity-50 peer-disabled:cursor-not-allowed"
      onClick={toggleVisibility}
      size={16}
    />
  );

  const inputType = visibility ? "text" : "password";

  return { inputIcon, inputType };
};

export default usePasswordToggle;
