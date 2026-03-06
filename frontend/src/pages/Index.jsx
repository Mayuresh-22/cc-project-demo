
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-b from-plantcare-green-light to-plantcare-beige p-4">
      <Card className="max-w-md w-full shadow-lg border-plantcare-green/20 animate-fade-in">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-plantcare-green-dark">Welcome to GreenGuardian</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center text-gray-600">
            Your personal assistant for taking care of your plants and keeping them healthy.
          </p>
          
          <div className="flex flex-col space-y-3">
            <Button 
              onClick={() => navigate("/my-plants")} 
              className="w-full bg-plantcare-green hover:bg-plantcare-green-dark"
            >
              Get Started
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => navigate("/login")} 
              className="w-full border-plantcare-green text-plantcare-green hover:bg-plantcare-green-light"
            >
              Sign In
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
