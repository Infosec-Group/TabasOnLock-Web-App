import { LogOut, Scissors } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";
import { paths } from "@/config/paths";
import { useLogout, useUser } from "@/lib/auth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function Navbar() {
  const navigate = useNavigate();
  const { data: user, isLoading } = useUser();
  const logout = useLogout();

  const handleLogout = () => {
    logout();
    navigate(paths.home.getHref()), window.location.reload();
  };

  return (
    <header className="bg-background/80 backdrop-blur-sm border-b border-primary sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Scissors className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold font-playfair-display">
              TabasOnLock
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            {isLoading ? null : !user ? (
              <>
                <Button
                  variant="ghost"
                  onClick={() => navigate(paths.auth.getHref())}
                >
                  Login
                </Button>
                <Button onClick={() => navigate(paths.auth.getHref())}>
                  Get Started
                </Button>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="relative h-10 w-10 rounded-full border border-primary"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarImage 
                        // src="https://randomuser.me/api/portraits/lego/2.jpg"
                        alt={user.firstName + " " + user.lastName}
                      />
                      <AvatarFallback
                        className="font-semibold font-rubik bg-rose-700 hover:text-pink-100"
                      >
                        {user.firstName?.[0] || ""}
                        {user.lastName?.[0] || ""}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="center"
                  forceMount
                  className="w-56 bg-linear-to-r from-primary to-rose-950"
                >
                  <div className="text-sm font-semibold items-start p-2 text-primary-foreground">
                    {user.firstName} {user.lastName}
                  </div>

                  <DropdownMenuItem
                    className="cursor-pointer text-primary-foreground"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4 text-primary-foreground" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
