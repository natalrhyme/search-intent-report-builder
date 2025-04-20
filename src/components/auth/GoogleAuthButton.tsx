
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface GoogleAuthButtonProps {
  onSuccess?: () => void;
}

const GoogleAuthButton = ({ onSuccess }: GoogleAuthButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // In a real app, this would use the @react-oauth/google library for authentication
  const handleLogin = async () => {
    setIsLoading(true);
    
    // Simulate authentication process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // For this prototype, we'll just simulate a successful login
    // and store a mock token in localStorage
    localStorage.setItem('gsc_auth_token', 'mock-auth-token');
    localStorage.setItem('gsc_auth_status', 'authenticated');
    
    setIsLoading(false);
    
    if (onSuccess) {
      onSuccess();
    } else {
      navigate('/builder');
    }
  };

  return (
    <Button
      className="w-full md:w-auto flex items-center gap-2"
      onClick={handleLogin}
      disabled={isLoading}
    >
      {isLoading ? (
        <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-search"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      )}
      {isLoading ? "Connecting..." : "Connect to Google Search Console"}
    </Button>
  );
};

export default GoogleAuthButton;
