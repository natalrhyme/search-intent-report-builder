
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import GoogleAuthButton from "@/components/auth/GoogleAuthButton";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

const Auth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const authStatus = localStorage.getItem('gsc_auth_status');
    if (authStatus === 'authenticated') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('gsc_auth_token');
    localStorage.removeItem('gsc_auth_status');
    setIsAuthenticated(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 container mx-auto px-4 md:px-6">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Google Search Console Connection</CardTitle>
              <CardDescription>
                Connect your GSC account to access your search data for report building
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isAuthenticated ? (
                <div className="flex flex-col items-center gap-4">
                  <p className="text-green-600 font-medium mb-2">
                    ✓ Successfully connected to Google Search Console
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/builder')}
                    className="w-full"
                  >
                    Go to Report Builder
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    To build reports with your GSC data, we need your permission to access your Search Console account.
                  </p>
                  <GoogleAuthButton />
                </div>
              )}
            </CardContent>
            {isAuthenticated && (
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full text-destructive"
                  onClick={handleLogout}
                >
                  Disconnect Account
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Auth;
