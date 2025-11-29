import { Scissors } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { useNavigate } from "react-router";
import { paths } from "@/config/paths";

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6 gap-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center bg-primary">
              <Scissors className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold font-playfair-display">
              TabasOnLock
            </h1>
          </div>
          <p className="text-xl text-secondary-foreground mb-4">
            Premium grooming services with expert stylists
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Book Appointment  */}
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-semibold text-gray-900 mb-3 font-rubik">
                Book Appointment
              </h3>
              <p className="text-dark-secondary-fg mb-6">
                Schedule your next haircut with our professional stylists
              </p>
              <Button 
                className="w-full"
                onClick={() => navigate(paths.app.stylists.getHref())}
              >
                Book Now
              </Button>
            </CardContent>
          </Card>

          {/* My Reservation */}
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-semibold text-gray-900 mb-3 font-rubik">
                My Reservations
              </h3>
              <p className="text-dark-secondary-fg mb-6">
                View and manage your upcoming appointments and reservations
              </p>
              <Button 
                variant="outline" 
                className="w-full border-primary"
                onClick={() => navigate(paths.app.reservationList.getHref())}
              >
                View Reservations
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Text */}
        <div className="mt-12 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold text-secondary-foreground mb-2">Expert Stylists</h4>
              <p className="text-muted-foreground">Professional hair stylists with years of experience</p>
            </div>

            <div>
              <h4 className="font-semibold text-secondary-foreground mb-2">Premium Service</h4>
              <p className="text-muted-foreground">High-quality cuts and styling services</p>
            </div>

            <div>
              <h4 className="font-semibold text-secondary-foreground mb-2">Easy Booking</h4>
              <p className="text-muted-foreground">Simple online reservation system</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
