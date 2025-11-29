import { Scissors } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";
import { paths } from "@/config/paths";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="bg-background/80 backdrop-blur-sm border-b border-primary sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Scissors className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold font-playfair-display">TabasOnLock</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate(paths.auth.getHref())}>
              Login
            </Button>
            <Button onClick={() => navigate(paths.auth.getHref())}>
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
