
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex gap-6 md:gap-10">
          <a className="flex items-center space-x-2" href="/">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-indigo-500">
              Search Intent Report Builder
            </span>
          </a>
        </div>
        <nav className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
          >
            Dashboard
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => navigate('/builder')}
          >
            Report Builder
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => navigate('/auth')}
          >
            Connect GSC
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
